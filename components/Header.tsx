"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { site } from "@/content/site";
import WhatsAppButton from "./WhatsAppButton";

export default function Header() {
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const { logo } = site.images;

  return (
    <header className="sticky top-0 z-40 border-b border-gold/20 bg-black/95 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6 lg:h-20 lg:px-10">
        <a href="#top" className="shrink-0">
          <Image src={logo.src} alt={site.name} width={logo.width} height={logo.height} loading="eager" sizes="56px" className="h-12 w-auto lg:h-16" />
        </a>

        <nav aria-label="Main" className="ml-auto hidden md:block">
          <ul className="flex items-center gap-7 text-sm">
            {site.nav.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="text-cream/85 transition-colors hover:text-gold">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="ml-auto flex items-center gap-2 md:ml-6">
          <button
            ref={toggleRef}
            type="button"
            className="min-h-12 px-3 text-sm text-cream md:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? site.closeLabel : site.menuLabel}
          </button>
          <WhatsAppButton message={site.sticky.message}>{site.headerCta}</WhatsAppButton>
        </div>
      </div>

      <nav id="mobile-nav" aria-label="Main" hidden={!open} className="border-t border-gold/20 md:hidden">
        <ul className="px-4 py-2">
          {site.nav.map((item) => (
            <li key={item.href}>
              <a href={item.href} onClick={() => setOpen(false)} className="block py-3 font-display text-2xl text-cream">
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
