import type { DayHours, Venue, WeeklyHours } from "@/config/site";

const dayLabels: Record<keyof WeeklyHours, string> = {
  mon: "Monday",
  tue: "Tuesday",
  wed: "Wednesday",
  thu: "Thursday",
  fri: "Friday",
  sat: "Saturday",
  sun: "Sunday",
};

const WEEKDAY_TO_KEY: Record<string, keyof WeeklyHours> = {
  Sun: "sun",
  Mon: "mon",
  Tue: "tue",
  Wed: "wed",
  Thu: "thu",
  Fri: "fri",
  Sat: "sat",
};

/** Every venue is in the UK, so opening hours are always evaluated in
 *  Europe/London — not the rendering server's local clock. This matters
 *  because SSR runs on a Cloudflare Worker (effectively UTC), which would
 *  otherwise be an hour behind actual UK time for most of the year (BST). */
function londonNow(date: Date): { key: keyof WeeklyHours; minutes: number } {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/London",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(date);
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "";
  const key = WEEKDAY_TO_KEY[get("weekday")] ?? "mon";
  const minutes = Number(get("hour")) * 60 + Number(get("minute"));
  return { key, minutes };
}

export function todaysHours(venue: Venue): {
  label: string;
  isOpen: boolean;
  text: string;
} {
  const { key, minutes } = londonNow(new Date());
  const today: DayHours = venue.hours[key];
  if ("closed" in today) {
    return { label: dayLabels[key], isOpen: false, text: "Closed today" };
  }
  const [oh, om] = today.open.split(":").map(Number);
  const [ch, cm] = today.close.split(":").map(Number);
  const open = oh * 60 + om;
  const close = ch === 0 ? 24 * 60 : ch * 60 + cm;
  const isOpen = minutes >= open && minutes < close;
  return {
    label: dayLabels[key],
    isOpen,
    text: `${today.open} – ${today.close}`,
  };
}

export function weeklyHoursTable(venue: Venue) {
  const order: (keyof WeeklyHours)[] = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
  return order.map((k) => {
    const h = venue.hours[k];
    return {
      key: k,
      label: dayLabels[k],
      text: "closed" in h ? "Closed" : `${h.open} – ${h.close}`,
    };
  });
}
