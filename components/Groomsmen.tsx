import Image from "next/image";
import { site } from "@/content/site";
import GroomsmenQuote from "./GroomsmenQuote";

export default function Groomsmen() {
  const { groomsmen } = site;
  return (
    <section id="groomsmen" aria-labelledby="groomsmen-h" className="bg-black">
      <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 md:grid-cols-[1.15fr_1fr] lg:gap-16 lg:px-10 lg:py-24">

        <div>
          <h2 id="groomsmen-h" className="text-4xl text-gold sm:text-5xl lg:text-6xl">
            {groomsmen.heading}
          </h2>
          <p className="mt-4 max-w-[40ch] text-lg leading-relaxed text-cream/90">{groomsmen.sub}</p>

          <h3 className="mt-10 font-sans text-sm font-medium text-cream/75">{groomsmen.includedLabel}</h3>
          <ul className="mt-3 space-y-2 text-lg">
            {groomsmen.included.map((item) => (
              <li key={item} className="border-b border-cream/15 pb-2">
                {item}
              </li>
            ))}
          </ul>

          <div className="mt-10">
            <GroomsmenQuote />
          </div>
        </div>

        <figure className="md:sticky md:top-28 md:self-start">
          <div className="relative aspect-[1220/1386] overflow-hidden bg-ink">
            <Image
              src={groomsmen.image.src}
              alt={groomsmen.image.alt}
              fill
              sizes="(min-width: 1280px) 620px, (min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
          {groomsmen.image.note && <figcaption className="mt-3 text-sm text-cream/70">{groomsmen.image.note}</figcaption>}
        </figure>
      </div>
    </section>
  );
}
