"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { site, type CollectionItem } from "@/content/site";
import { fill, wa } from "@/lib/whatsapp";
import Seam from "./Seam";

const c = site.collection;

function AskLink({ item }: { item: CollectionItem }) {
  return (
    <a
      href={wa(fill(c.askTemplate, { item: item.askName }))}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex min-h-11 items-center font-medium text-ink underline decoration-burgundy decoration-2 underline-offset-[6px] hover:text-burgundy"
    >
      {c.askLabel}
      <span className="sr-only">: {item.name}</span>
    </a>
  );
}

function Details({ item }: { item: CollectionItem }) {
  return (
    <>
      <h3 className="text-2xl leading-snug">{item.name}</h3>
      {item.image.note && <p className="mt-1 text-sm text-ink/70">{item.image.note}</p>}
      {item.price && <p className="mt-1 font-medium">{item.price}</p>}
      <div className="mt-2">
        <AskLink item={item} />
      </div>
    </>
  );
}

export default function Collection() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const openerRef = useRef<HTMLButtonElement | null>(null);
  const [active, setActive] = useState<CollectionItem | null>(null);

  const open = (item: CollectionItem, opener: HTMLButtonElement) => {
    openerRef.current = opener;
    setActive(item);
  };

  // Open after the content has rendered, so focus lands on the close button.
  useEffect(() => {
    const d = dialogRef.current;
    if (active && d && !d.open) d.showModal();
  }, [active]);
  const close = () => dialogRef.current?.close();

  const photos = c.items.filter((i) => i.kind === "photo");
  const campaign = c.items.filter((i) => i.kind === "campaign");

  const thumb = (item: CollectionItem, aspect: string, sizes: string, position = "") => (
    <button
      type="button"
      onClick={(e) => open(item, e.currentTarget)}
      className={`relative block w-full cursor-zoom-in overflow-hidden bg-ink/10 ${aspect}`}
    >
      <Image src={item.image.src} alt={item.image.alt} fill sizes={sizes} className={`object-cover ${position}`} />
      <span className="sr-only">
        {c.enlargeLabel}: {item.name}
      </span>
    </button>
  );

  return (
    <section id="collection" aria-labelledby="collection-h" className="on-cream bg-cream text-ink">
      <div className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-10">
        <Seam tone="deep" />
      </div>
      <div className="mx-auto max-w-7xl px-4 pt-12 pb-16 sm:px-6 lg:px-10 lg:pt-16 lg:pb-24">
        <h2 id="collection-h" className="text-4xl sm:text-5xl lg:text-6xl">
          {c.heading}
        </h2>
        <p className="mt-3 max-w-[45ch] text-lg text-ink/85">{c.sub}</p>

        <ul className="mt-12 grid gap-x-5 gap-y-12 sm:grid-cols-3 lg:gap-x-8">
          {photos.map((item) => (
            <li key={item.name}>
              {thumb(item, "aspect-[3/4]", "(min-width: 1280px) 390px, (min-width: 640px) 31vw, 100vw")}
              <div className="mt-4">
                <Details item={item} />
              </div>
            </li>
          ))}
        </ul>

        <ul className="mt-16 grid gap-10 border-t border-gold-deep/60 pt-12 lg:grid-cols-2 lg:gap-12">
          {campaign.map((item) => (
            <li key={item.name} className="grid grid-cols-[minmax(0,9rem)_1fr] items-start gap-5 sm:grid-cols-[minmax(0,14rem)_1fr] sm:gap-7">
              {thumb(item, "aspect-square", "(min-width: 640px) 224px, 144px", "object-[center_15%]")}
              <div>
                <Details item={item} />
              </div>
            </li>
          ))}
        </ul>
      </div>

      <dialog
        ref={dialogRef}
        aria-label={active?.name}
        onClose={() => {
          setActive(null);
          openerRef.current?.focus();
        }}
        onClick={(e) => e.target === e.currentTarget && close()}
        className="m-auto max-h-[94vh] w-[min(92vw,720px)] bg-black p-0 text-cream backdrop:bg-black/85"
      >
        {active && (
          <div className="p-4 sm:p-6">
            <div className="flex items-start justify-between gap-4">
              <p className="font-display text-2xl text-gold">{active.name}</p>
              <button type="button" onClick={close} autoFocus className="min-h-11 shrink-0 border border-cream/40 px-4 text-sm hover:border-gold hover:text-gold">
                {site.closeLabel}
              </button>
            </div>
            <div
              className={`relative mx-auto mt-4 w-full ${active.kind === "photo" ? "aspect-[3/4] max-w-[calc(72vh*0.75)]" : "aspect-square max-w-[72vh]"}`}
            >
              <Image src={active.image.src} alt={active.image.alt} fill sizes="(min-width: 800px) 720px, 92vw" className="object-contain" />
            </div>
            {active.image.note && <p className="mt-3 text-sm text-cream/75">{active.image.note}</p>}
          </div>
        )}
      </dialog>
    </section>
  );
}
