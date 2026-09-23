"use client";

import { useState, type FormEvent } from "react";
import { site } from "@/content/site";
import { fill, wa } from "@/lib/whatsapp";
import { WhatsAppIcon } from "./WhatsAppButton";

const f = site.groomsmen.form;

const formatDate = (iso: string) =>
  new Intl.DateTimeFormat(site.locale, { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(
    new Date(`${iso}T00:00:00Z`),
  );

export function buildQuoteMessage(n: number, isoDate: string, colour: string) {
  return fill(f.template, {
    n,
    date: formatDate(isoDate),
    colour: colour.trim() || f.unspecified,
  });
}

type Errors = { count?: string; date?: string };

export default function GroomsmenQuote() {
  const [count, setCount] = useState("");
  const [date, setDate] = useState("");
  const [colour, setColour] = useState("");
  const [errors, setErrors] = useState<Errors>({});

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const n = Number(count);
    const next: Errors = {};
    if (!Number.isInteger(n) || n < f.min || n > f.max) next.count = f.countError;
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) next.date = f.dateError;
    setErrors(next);
    if (next.count || next.date) {
      document.getElementById(next.count ? "gm-count" : "gm-date")?.focus();
      return;
    }
    window.open(wa(buildQuoteMessage(n, date, colour)), "_blank", "noopener,noreferrer");
  };

  const field =
    "mt-2 block min-h-12 w-full border border-cream/35 bg-black px-3 text-base text-cream placeholder:text-cream/45 focus:border-gold focus-visible:outline-offset-0 [color-scheme:dark]";

  return (
    <form noValidate onSubmit={onSubmit} className="border border-gold/40 p-5 sm:p-7" aria-labelledby="gm-form-h">
      <h3 id="gm-form-h" className="text-3xl text-gold">
        {f.heading}
      </h3>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="gm-count" className="text-sm font-medium">
            {f.countLabel}
          </label>
          <input
            id="gm-count"
            name="count"
            type="number"
            inputMode="numeric"
            min={f.min}
            max={f.max}
            step={1}
            required
            value={count}
            onChange={(e) => setCount(e.target.value)}
            aria-invalid={!!errors.count}
            aria-describedby={errors.count ? "gm-count-err" : undefined}
            className={field}
          />
          {errors.count && (
            <p id="gm-count-err" className="mt-2 text-sm text-gold-light">
              {errors.count}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="gm-date" className="text-sm font-medium">
            {f.dateLabel}
          </label>
          <input
            id="gm-date"
            name="date"
            type="date"
            required
            value={date}
            onChange={(e) => setDate(e.target.value)}
            aria-invalid={!!errors.date}
            aria-describedby={errors.date ? "gm-date-err" : undefined}
            className={field}
          />
          {errors.date && (
            <p id="gm-date-err" className="mt-2 text-sm text-gold-light">
              {errors.date}
            </p>
          )}
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="gm-colour" className="text-sm font-medium">
            {f.colourLabel} <span className="font-normal text-cream/70">({f.optional})</span>
          </label>
          <input
            id="gm-colour"
            name="colour"
            type="text"
            autoComplete="off"
            maxLength={60}
            placeholder={f.colourPlaceholder}
            value={colour}
            onChange={(e) => setColour(e.target.value)}
            className={field}
          />
        </div>
      </div>

      <button
        type="submit"
        className="mt-7 inline-flex min-h-14 w-full items-center justify-center gap-2.5 bg-gold px-6 text-base font-medium text-black transition-colors hover:bg-gold-light sm:w-auto"
      >
        <WhatsAppIcon className="size-5" />
        {f.submit}
      </button>
    </form>
  );
}
