import Image from "next/image";
import { site } from "@/content/site";

export default function Runway() {
  const { runway } = site;
  // The square source has carousel dots along the bottom and an arrow on the right edge.
  // A 4:5 frame with object-fit: cover already trims ~140px from each side, which removes
  // the arrow; making the image 4.5% taller than the frame, pinned to the top, trims the
  // bottom ~60px where the dots sit.
  const crop = runway.cropSourceEdges ? "h-[104.5%]" : "h-full";

  return (
    <section id="runway" aria-labelledby="runway-h" className="on-cream bg-cream text-ink">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 md:grid-cols-[1fr_1.1fr] md:items-center lg:gap-16 lg:px-10 lg:py-24">
        <div>
          <h2 id="runway-h" className="text-4xl sm:text-5xl lg:text-6xl">
            {runway.heading}
          </h2>
          <p className="mt-5 max-w-[48ch] text-lg leading-relaxed text-ink/90">{runway.body}</p>
        </div>

        <figure>
          <div className="relative aspect-[4/5] overflow-hidden bg-ink/10">
            <div className={`absolute inset-x-0 top-0 ${crop}`}>
              <Image src={runway.image.src} alt={runway.image.alt} fill sizes="(min-width: 1280px) 640px, (min-width: 768px) 55vw, 100vw" className="object-cover object-top" />
            </div>
          </div>
          <figcaption className="mt-3 text-sm text-ink/80">{runway.caption}</figcaption>
        </figure>
      </div>
    </section>
  );
}
