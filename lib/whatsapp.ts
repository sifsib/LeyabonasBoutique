import { site } from "@/content/site";

export const wa = (message: string) =>
  `https://wa.me/${site.whatsapp.e164}?text=${encodeURIComponent(message)}`;

/** Replace {key} tokens in a content template. */
export const fill = (template: string, values: Record<string, string | number>) =>
  template.replace(/\{(\w+)\}/g, (_, key: string) => String(values[key] ?? ""));
