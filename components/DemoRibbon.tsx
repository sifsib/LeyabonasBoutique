import { site } from "@/content/site";

export default function DemoRibbon() {
  return (
    <div className="bg-cream px-4 py-1.5 text-center text-xs text-ink">
      <a href={site.demo.href} className="underline decoration-ink/40 underline-offset-2 hover:decoration-ink">
        {site.demo.ribbon}
      </a>
    </div>
  );
}
