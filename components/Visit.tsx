import { site } from "@/content/site";
import Seam from "./Seam";
import WhatsAppButton from "./WhatsAppButton";

export default function Visit() {
  const { visit, address } = site;
  const maps = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address.mapsQuery)}`;
  const link = "underline decoration-gold-deep decoration-1 underline-offset-4 hover:decoration-ink";

  return (
    <section id="visit" aria-labelledby="visit-h" className="on-cream bg-cream text-ink">
      <div className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-10">
        <Seam tone="deep" />
      </div>
      <div className="mx-auto grid max-w-7xl gap-12 px-4 pt-12 pb-16 sm:px-6 md:grid-cols-2 lg:gap-16 lg:px-10 lg:pt-16 lg:pb-24">
        <div>
          <h2 id="visit-h" className="text-4xl sm:text-5xl lg:text-6xl">
            {visit.heading}
          </h2>

          <div className="mt-8">
            <WhatsAppButton message={visit.whatsappMessage} variant="ink" size="lg" className="w-full sm:w-auto">
              {visit.whatsappLabel} {site.whatsapp.display}
            </WhatsAppButton>
          </div>

          {site.chooseDay && (
            <div className="mt-8 border-l-2 border-burgundy pl-4">
              <p className="font-display text-2xl">{visit.chooseDayLabel}</p>
              <p className="mt-1 text-ink/85">{site.chooseDay}</p>
            </div>
          )}
        </div>

        <dl className="grid content-start gap-6 text-lg">
          <div>
            <dt className="text-sm font-medium text-ink/70">{visit.addressLabel}</dt>
            <dd className="mt-1">
              <address className="not-italic">{address.line}</address>
              <a href={maps} target="_blank" rel="noopener noreferrer" className={`mt-2 inline-block ${link}`}>
                {visit.directionsLabel}
              </a>
            </dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-ink/70">{visit.phoneLabel}</dt>
            <dd className="mt-1">
              <a href={`tel:${site.phone.tel}`} className={link}>
                {site.phone.display}
              </a>
              {site.otherPhones?.map((p) => (
                <span key={p} className="block">
                  <a href={`tel:${p.replace(/\s/g, "")}`} className={link}>
                    {p}
                  </a>
                </span>
              ))}
            </dd>
          </div>
          <div>
            <dt className="text-sm font-medium text-ink/70">{visit.emailLabel}</dt>
            <dd className="mt-1 break-words">
              <a href={`mailto:${site.email}`} className={link}>
                {site.email}
              </a>
            </dd>
          </div>
          {site.hours && (
            <div>
              <dt className="text-sm font-medium text-ink/70">{visit.hoursLabel}</dt>
              <dd className="mt-1 whitespace-pre-line">{site.hours}</dd>
            </div>
          )}
        </dl>
      </div>
    </section>
  );
}
