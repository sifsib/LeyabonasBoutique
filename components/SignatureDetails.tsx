import Image from "next/image";
import { site } from "@/content/site";
import WhatsAppButton from "./WhatsAppButton";

export default function SignatureDetails() {
  const { details } = site;
  return (
    <section id="details" aria-labelledby="details-h" className="bg-black">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 md:grid-cols-2 md:items-center lg:gap-16 lg:px-10 lg:py-24">
        <figure>
          <div className="relative aspect-square overflow-hidden bg-white">
            <Image src={details.image.src} alt={details.image.alt} fill sizes="(min-width: 1280px) 590px, (min-width: 768px) 48vw, 100vw" className="object-cover" />
          </div>
          {details.image.note && <figcaption className="mt-3 text-sm text-cream/70">{details.image.note}</figcaption>}
        </figure>

        <div>
          <h2 id="details-h" className="text-4xl text-gold sm:text-5xl lg:text-6xl">
            {details.heading}
          </h2>
          <ul className="mt-8">
            {details.points.map((point) => (
              <li key={point} className="border-b border-dashed border-gold/45 py-5 font-display text-2xl leading-snug sm:text-3xl">
                {point}
              </li>
            ))}
          </ul>
          <div className="mt-10">
            <WhatsAppButton message={details.cta.message} variant="outline">
              {details.cta.label}
            </WhatsAppButton>
          </div>
        </div>
      </div>
    </section>
  );
}
