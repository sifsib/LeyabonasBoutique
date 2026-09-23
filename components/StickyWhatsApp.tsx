"use client";

import { useEffect, useState } from "react";
import { site } from "@/content/site";
import WhatsAppButton from "./WhatsAppButton";

/** Mobile-only bar: appears once the hero is off screen, hides while the visit section or footer is showing. */
export default function StickyWhatsApp() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const hero = document.querySelector("[data-hero]");
    const visit = document.getElementById("visit");
    const footer = document.querySelector("footer");
    if (!hero) return;

    const state = new Map<Element, boolean>();
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) state.set(e.target, e.isIntersecting);
      const heroVisible = state.get(hero) ?? true;
      const contactVisible = (visit && state.get(visit)) || (footer && state.get(footer));
      setShow(!heroVisible && !contactVisible);
    });
    [hero, visit, footer].forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-30 border-t border-gold/30 bg-black/95 p-3 md:hidden ${show ? "translate-y-0" : "pointer-events-none translate-y-full"}`}
      aria-hidden={!show}
      inert={!show}
    >
      <WhatsAppButton message={site.sticky.message} className="w-full">
        {site.sticky.label}
      </WhatsAppButton>
    </div>
  );
}
