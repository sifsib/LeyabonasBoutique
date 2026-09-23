import Image from "next/image";
import { site } from "@/content/site";
import { isDemo } from "@/lib/demo";

export default function Footer() {
  const { logo } = site.images;
  const socials = [
    { href: site.socials.instagram, label: site.footer.socialLabels.instagram },
    { href: site.socials.facebook, label: site.footer.socialLabels.facebook },
    { href: site.socials.tiktok, label: site.footer.socialLabels.tiktok },
  ].filter((s) => s.href);

  return (
    <footer className="bg-black">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 md:grid-cols-[auto_1fr_auto] md:items-center lg:px-10">
        <Image src={logo.src} alt={site.name} width={logo.width} height={logo.height} sizes="80px" className="h-20 w-auto" />
        <p className="max-w-[40ch] text-cream/85">{site.footer.line}</p>
        <ul className="flex flex-wrap gap-x-6 gap-y-2">
          {socials.map((s) => (
            <li key={s.label}>
              <a href={s.href} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center text-gold hover:text-gold-light">
                {s.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="border-t border-cream/15">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-5 text-sm text-cream/70 sm:flex-row sm:justify-between sm:px-6 lg:px-10">
          <p>
            &copy; {new Date().getFullYear()} {site.name}
          </p>
          {isDemo && (
            <p>
              <a href={site.demo.href} className="underline decoration-cream/40 underline-offset-2 hover:text-cream">
                {site.demo.ribbon}
              </a>
            </p>
          )}
        </div>
      </div>
    </footer>
  );
}
