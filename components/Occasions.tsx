import Image from "next/image";
import { site } from "@/content/site";
import WhatsAppButton from "./WhatsAppButton";

export default function Occasions() {
  const { occasions } = site;
  const anyRowImage = occasions.items.some((o) => o.image);
  const mood = anyRowImage ? null : occasions.moodImage;

  return (
    <section id="occasions" aria-labelledby="occasions-h" className="on-cream bg-cream text-ink">
      <div className={`mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:px-10 lg:py-24 ${mood ? "md:grid-cols-[1.25fr_1fr] md:items-start" : ""}`}>
        <div>
          <h2 id="occasions-h" className="text-4xl sm:text-5xl lg:text-6xl">
            {occasions.heading}
          </h2>

          <ul className="mt-10 border-t border-gold-deep/60">
            {occasions.items.map((o, i) =>
              o.image ? (
                <li key={o.name} className="grid items-center gap-6 border-b border-gold-deep/60 py-8 sm:grid-cols-2 sm:gap-10">
                  <div className={i % 2 ? "sm:order-2" : ""}>
                    <h3 className="text-2xl sm:text-[1.7rem]">{o.name}</h3>
                    <p className="mt-2 max-w-[46ch] leading-relaxed text-ink/85">{o.line}</p>
                  </div>
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image src={o.image.src} alt={o.image.alt} fill sizes="(min-width: 640px) 40vw, 100vw" className="object-cover" />
                  </div>
                </li>
              ) : (
                <li
                  key={o.name}
                  className="border-b border-gold-deep/60 py-6 sm:grid sm:grid-cols-[minmax(0,15rem)_1fr] sm:items-baseline sm:gap-8"
                >
                  <h3 className="text-2xl sm:text-[1.7rem]">{o.name}</h3>
                  <p className="mt-1 max-w-[46ch] leading-relaxed text-ink/85 sm:mt-0">{o.line}</p>
                </li>
              ),
            )}
          </ul>

          <div className="mt-10">
            <WhatsAppButton message={occasions.cta.message} variant="ink">
              {occasions.cta.label}
            </WhatsAppButton>
          </div>
        </div>

        {mood && (
          <figure className="md:sticky md:top-28">
            <div className="relative aspect-[4/5] overflow-hidden bg-ink/10">
              <Image src={mood.src} alt={mood.alt} fill sizes="(min-width: 1280px) 500px, (min-width: 768px) 40vw, 100vw" className="object-cover" />
            </div>
            {mood.note && <figcaption className="mt-3 text-sm text-ink/70">{mood.note}</figcaption>}
          </figure>
        )}
      </div>
    </section>
  );
}
