import Image from "next/image";
import { site } from "@/content/site";
import Seam from "./Seam";
import WhatsAppButton from "./WhatsAppButton";

export default function Hero() {
  const { hero } = site;
  return (
    <section id="top" data-hero className="bg-black">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 pt-10 pb-12 sm:px-6 md:grid-cols-[1.1fr_1fr] md:items-center md:gap-12 lg:px-10 lg:pt-16 lg:pb-20">
        <div>
          <h1 className="font-display text-[3.25rem] leading-[1.02] font-semibold text-gold sm:text-7xl lg:text-8xl">
            {hero.lines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h1>
          <p className="mt-6 max-w-[34ch] text-lg leading-relaxed text-cream/90">{hero.sub}</p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <WhatsAppButton message={hero.primary.message} size="lg">
              {hero.primary.label}
            </WhatsAppButton>
            <a
              href={hero.secondary.href}
              className="inline-flex min-h-14 items-center justify-center border border-cream/40 px-7 text-base font-medium text-cream transition-colors hover:border-gold hover:text-gold"
            >
              {hero.secondary.label}
            </a>
          </div>

          <p className="mt-10 text-center font-script text-4xl text-gold sm:max-w-md lg:text-5xl">{hero.signature}</p>
        </div>

        <div>
          <div className="relative aspect-[4/5] w-full overflow-hidden bg-ink">
            <Image
              src={hero.image.src}
              alt={hero.image.alt}
              fill
              preload
              fetchPriority="high"
              quality={70}
              sizes="(min-width: 1280px) 560px, (min-width: 768px) 45vw, calc(100vw - 2rem)"
              className="object-cover"
            />
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-4 pb-6 sm:px-6 lg:px-10">
        <Seam animate />
      </div>
    </section>
  );
}
