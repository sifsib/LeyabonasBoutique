// Builds a static copy of the site for Apache hosting (DirectAdmin, cPanel) and zips it.
//   npm run build:static                          -> demo mode on
//   NEXT_PUBLIC_DEMO=false npm run build:static   -> live mode
// Upload the zip's contents into the subdomain's document root and extract.
import { execSync } from "node:child_process";
import { readdir, rm, writeFile, stat } from "node:fs/promises";
import path from "node:path";

const demo = process.env.NEXT_PUBLIC_DEMO !== "false";
const run = (cmd, env = {}) => execSync(cmd, { stdio: "inherit", env: { ...process.env, ...env } });

run("node scripts/optimize-images.mjs");
await rm("out", { recursive: true, force: true });
run("npx next build", { STATIC_EXPORT: "1" });

// The page only uses the pre-sized WebP files. Keep the original logo (JSON-LD points to it)
// and drop the other full-size PNGs so the upload stays small.
const keep = new Set(["out/images/brand/leyabonas-logo-primary-extracted-from-welcome-post.png"]);
async function prune(dir) {
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) await prune(p);
    else if (!keep.has(p)) await rm(p);
  }
  if ((await readdir(dir)).length === 0) await rm(dir, { recursive: true });
}
await prune("out/images");

const htaccess = `# Leyabona's Boutique: static site for Apache
Options -Indexes
DirectoryIndex index.html
ErrorDocument 404 /404.html

<IfModule mod_rewrite.c>
  RewriteEngine On
  # Force HTTPS
  RewriteCond %{HTTPS} !=on
  RewriteCond %{HTTP:X-Forwarded-Proto} !=https
  RewriteRule ^ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
</IfModule>

# Metadata routes are exported without file extensions
<FilesMatch "^(opengraph-image|twitter-image|icon|apple-icon)$">
  ForceType image/png
</FilesMatch>
AddType image/webp .webp
AddType application/manifest+json .webmanifest

<IfModule mod_headers.c>
${demo ? '  # Concept preview: keep search engines out. Rebuild with NEXT_PUBLIC_DEMO=false to remove.\n  Header always set X-Robots-Tag "noindex, nofollow"\n' : ""}  Header always set X-Content-Type-Options "nosniff"
  Header always set Referrer-Policy "strict-origin-when-cross-origin"
  # Hashed build files and resized images never change: cache for a year
  <FilesMatch "\\.(js|css|woff2|webp)$">
    Header set Cache-Control "public, max-age=31536000, immutable"
  </FilesMatch>
  <FilesMatch "\\.html$">
    Header set Cache-Control "public, max-age=0, must-revalidate"
  </FilesMatch>
</IfModule>

<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/css text/plain text/xml application/javascript application/json image/svg+xml
</IfModule>
`;
await writeFile("out/.htaccess", htaccess);

const zipName = `leyabonas-site-${demo ? "demo" : "live"}.zip`;
await rm(zipName, { force: true });
run(`cd out && zip -qr -X ../${zipName} . -x '*.DS_Store'`);
const kb = Math.round((await stat(zipName)).size / 1024);
console.log(`\n${zipName} ready (${kb} KB). Demo mode: ${demo ? "on" : "off"}.`);
