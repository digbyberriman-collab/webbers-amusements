import type { DayHours, Venue, WeeklyHours } from "@/config/site";

const dayKeys: (keyof WeeklyHours)[] = [
  "sun",
  "mon",
  "tue",
  "wed",
  "thu",
  "fri",
  "sat",
];

const dayLabels: Record<keyof WeeklyHours, string> = {
  mon: "Monday",
  tue: "Tuesday",
  wed: "Wednesday",
  thu: "Thursday",
  fri: "Friday",
  sat: "Saturday",
  sun: "Sunday",
};

export function todaysHours(venue: Venue): {
  label: string;
  isOpen: boolean;
  text: string;
} {
  const now = new Date();
  const key = dayKeys[now.getDay()];
  const today: DayHours = venue.hours[key];
  if ("closed" in today) {
    return { label: dayLabels[key], isOpen: false, text: "Closed today" };
  }
  const [oh, om] = today.open.split(":").map(Number);
  const [ch, cm] = today.close.split(":").map(Number);
  const open = oh * 60 + om;
  const close = ch === 0 ? 24 * 60 : ch * 60 + cm;
  const minutes = now.getHours() * 60 + now.getMinutes();
  const isOpen = minutes >= open && minutes < close;
  return {
    label: dayLabels[key],
    isOpen,
    text: `${today.open} – ${today.close}`,
  };
}

/**
 * If the venue is open, how many minutes until it closes today?
 * If closed (or closed for the day), returns null. Use for "closes in
 * 2h 14m" countdown copy.
 */
export function minutesUntilClose(venue: Venue): number | null {
  const now = new Date();
  const key = dayKeys[now.getDay()];
  const today: DayHours = venue.hours[key];
  if ("closed" in today) return null;
  const [ch, cm] = today.close.split(":").map(Number);
  const close = ch === 0 ? 24 * 60 : ch * 60 + cm;
  const minutes = now.getHours() * 60 + now.getMinutes();
  const remaining = close - minutes;
  return remaining > 0 ? remaining : null;
}

/** Format a minute count as e.g. "2h 14m" or "37m". */
export function formatDuration(mins: number): string {
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  if (h === 0) return `${m}m`;
  if (m === 0) return `${h}h`;
  return `${h}h ${m}m`;
}

export function weeklyHoursTable(venue: Venue) {
  const order: (keyof WeeklyHours)[] = [
    "mon",
    "tue",
    "wed",
    "thu",
    "fri",
    "sat",
    "sun",
  ];
  return order.map((k) => {
    const h = venue.hours[k];
    return {
      key: k,
      label: dayLabels[k],
      text: "closed" in h ? "Closed" : `${h.open} – ${h.close}`,
    };
  });
}
