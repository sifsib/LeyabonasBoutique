import Image from "next/image";
import { site } from "@/content/site";
import { isDemo } from "@/lib/demo";

export default function About() {
  const { about, recognition } = site;
  const portrait = about.portrait ?? (isDemo ? about.demoPortrait : null);

  return (
    <section id="about" aria-labelledby="about-h" className="bg-black">
      <div
        className={`mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:gap-16 lg:px-10 lg:py-24 ${portrait ? "md:grid-cols-[1.4fr_1fr] md:items-center" : ""}`}
      >
        <figure>
          <h2 id="about-h" className="sr-only">
            {about.heading}
          </h2>
          <blockquote>
            <p className="max-w-[22ch] font-display text-4xl leading-[1.15] font-medium text-cream sm:text-5xl lg:text-[3.6rem]">
              &ldquo;{about.quote}&rdquo;
            </p>
          </blockquote>
          <figcaption className="mt-6 text-gold">{about.attribution}</figcaption>

          {recognition.verified && recognition.lines.length > 0 && (
            <div className="mt-10 border-t border-gold/30 pt-6">
              <h3 className="font-sans text-sm font-medium text-cream/75">{about.recognitionLabel}</h3>
              <ul className="mt-3 space-y-1 text-cream/90">
                {recognition.lines.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </div>
          )}
        </figure>

        {portrait && (
          <div className="relative mx-auto aspect-[1050/1412] w-full max-w-sm overflow-hidden bg-ink">
            <Image src={portrait.src} alt={portrait.alt} fill sizes="(min-width: 768px) 384px, 90vw" className="object-cover" />
          </div>
        )}
      </div>
    </section>
  );
}
