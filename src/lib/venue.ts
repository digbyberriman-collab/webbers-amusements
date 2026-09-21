import type { Venue } from "@/config/site";

/** True once a placeholder like "01244 [CLIENT TO CONFIRM]" has been
 *  replaced with a real number. */
export function hasConfirmedPhone(phone: string): boolean {
  return !phone.includes("[CLIENT TO CONFIRM");
}

/** A safe `tel:` href, or `undefined` while the number is still a
 *  placeholder — a broken tel: link is worse than no link at all. */
export function telHref(phone: string): string | undefined {
  return hasConfirmedPhone(phone) ? `tel:${phone.replace(/\s/g, "")}` : undefined;
}

/** Display text for a venue phone number — the real number, or a plain
 *  note instead of the raw "[CLIENT TO CONFIRM]" placeholder string. */
export function phoneDisplay(phone: string): string {
  return hasConfirmedPhone(phone) ? phone : "Number coming soon";
}

/** JSON-LD structured data should never contain an internal placeholder
 *  string — omit the field entirely rather than publish it. */
export function structuredPhone(venue: Pick<Venue, "phone">) {
  return hasConfirmedPhone(venue.phone) ? venue.phone : undefined;
}

/**
 * The two Chester venues share a city name, so UI copy distinguishes them
 * by street. This was previously reimplemented independently in five
 * files with three different, inconsistent output formats — this is the
 * single source of truth for that label.
 */
export function chesterStreetLabel(
  venue: Pick<Venue, "slug" | "city">,
  { abbreviated = false }: { abbreviated?: boolean } = {},
): string | null {
  if (venue.city !== "Chester") return null;
  if (venue.slug === "chester-frodsham") {
    return abbreviated ? "Frodsham St" : "Frodsham Street";
  }
  return abbreviated ? "Northgate St" : "Northgate Street";
}
