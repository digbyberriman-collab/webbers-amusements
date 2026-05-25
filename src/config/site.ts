// Single source of truth for Webbers content.
// [CLIENT TO CONFIRM] markers need verification before launch.

export type DayHours = { open: string; close: string } | { closed: true };
export type WeeklyHours = Record<
  "mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun",
  DayHours
>;

export interface Venue {
  slug: string;
  name: string;
  city: string;
  address: string[];
  postcode: string;
  phone: string;
  email?: string;
  lat: number;
  lng: number;
  hours: WeeklyHours;
  primary?: boolean;
}

export interface Game {
  id: string;
  name: string;
  type: "Slots" | "Jackpot" | "Classic" | "Roulette";
  features: string[]; // Megaways, Free Spins, Community Play, Progressive
  description: string;
  maxPrize: number;
  isNew?: boolean;
  isFeatured?: boolean;
}

export interface Promotion {
  id: string;
  title: string;
  description: string;
  startsOn: string;
  endsOn: string;
  venue?: string;
  badge?: string;
}

const standardHours: WeeklyHours = {
  mon: { open: "09:00", close: "23:00" },
  tue: { open: "09:00", close: "23:00" },
  wed: { open: "09:00", close: "23:00" },
  thu: { open: "09:00", close: "23:00" },
  fri: { open: "09:00", close: "00:00" },
  sat: { open: "09:00", close: "00:00" },
  sun: { open: "10:00", close: "22:00" },
};

export const siteConfig = {
  brand: {
    name: "Webbers Amusements",
    short: "Webbers",
    parent: "Webber Leisure",
    foundedYear: 1954,
    tagline: "Chester's home of modern gaming.",
    description:
      "A licensed adult gaming centre in the heart of Chester. Premium slots, modern terminals, and the warm hospitality of a family business since the 1950s.",
  },
  compliance: {
    licenceNumber: "[CLIENT TO CONFIRM LICENCE NUMBER]",
    helpline: "0808 8020 133",
    minAge: 18,
    maxSlotPrize: 500,
  },
  contact: {
    email: "[CLIENT TO CONFIRM EMAIL]",
    socials: {
      instagram: "#",
      facebook: "#",
    },
  },
  venues: [
    {
      slug: "chester-frodsham",
      name: "Webbers Chester — Frodsham Street",
      city: "Chester",
      address: ["28A Frodsham Street"],
      postcode: "CH1 3JL",
      phone: "01244 [CLIENT TO CONFIRM]",
      lat: 53.1934,
      lng: -2.8893,
      hours: standardHours,
      primary: true,
    },
    {
      slug: "chester-northgate",
      name: "Webbers Chester — Northgate Street",
      city: "Chester",
      address: ["[CLIENT TO CONFIRM NUMBER] Northgate Street"],
      postcode: "[CLIENT TO CONFIRM]",
      phone: "01244 [CLIENT TO CONFIRM]",
      lat: 53.1925,
      lng: -2.8912,
      hours: standardHours,
    },
    {
      slug: "rhyl",
      name: "Webbers Rhyl",
      city: "Rhyl",
      address: ["[CLIENT TO CONFIRM ADDRESS]"],
      postcode: "[CLIENT TO CONFIRM]",
      phone: "01745 [CLIENT TO CONFIRM]",
      lat: 53.3201,
      lng: -3.4914,
      hours: standardHours,
    },
    {
      slug: "caernarfon",
      name: "Webbers Caernarfon",
      city: "Caernarfon",
      address: ["[CLIENT TO CONFIRM ADDRESS]"],
      postcode: "[CLIENT TO CONFIRM]",
      phone: "01286 [CLIENT TO CONFIRM]",
      lat: 53.1410,
      lng: -4.2716,
      hours: standardHours,
    },
  ] as Venue[],
  games: [
    {
      id: "fishin-frenzy",
      name: "Fishin' Frenzy Megaways",
      type: "Slots",
      features: ["Megaways", "Free Spins"],
      description: "Cult-classic reels with up to 117,649 ways to win.",
      maxPrize: 500,
      isFeatured: true,
    },
    {
      id: "rainbow-riches",
      name: "Rainbow Riches",
      type: "Slots",
      features: ["Free Spins", "Pick & Win"],
      description: "The pub favourite, now in HD on the venue floor.",
      maxPrize: 500,
      isFeatured: true,
    },
    {
      id: "eye-of-horus",
      name: "Eye of Horus",
      type: "Slots",
      features: ["Free Spins", "Expanding Symbols"],
      description: "Hieroglyphic reels with cascading free spin rounds.",
      maxPrize: 500,
    },
    {
      id: "starburst",
      name: "Starburst",
      type: "Slots",
      features: ["Re-Spins"],
      description: "Bright, fast, and forgiving — a perennial favourite.",
      maxPrize: 500,
    },
    {
      id: "community-jackpot",
      name: "Community Jackpot",
      type: "Jackpot",
      features: ["Community Play", "Progressive"],
      description: "A shared progressive that lights up the whole floor.",
      maxPrize: 500,
      isFeatured: true,
      isNew: true,
    },
    {
      id: "electronic-roulette",
      name: "Electronic Roulette",
      type: "Roulette",
      features: ["Community Play"],
      description: "Real wheel, digital betting terminals around it.",
      maxPrize: 500,
    },
    {
      id: "deal-or-no-deal",
      name: "Deal or No Deal",
      type: "Slots",
      features: ["Free Spins", "Bonus Round"],
      description: "Box-picking bonus round with up to 26 outcomes.",
      maxPrize: 500,
    },
    {
      id: "monopoly-big-event",
      name: "Monopoly Big Event",
      type: "Slots",
      features: ["Megaways", "Bonus Round"],
      description: "Pass Go on the reels for community bonus rounds.",
      maxPrize: 500,
    },
    {
      id: "wild-west-gold",
      name: "Wild West Gold",
      type: "Slots",
      features: ["Free Spins", "Multipliers"],
      description: "Frontier reels with multiplier wilds during free spins.",
      maxPrize: 500,
      isNew: true,
    },
    {
      id: "club-fruity",
      name: "Club Fruity",
      type: "Classic",
      features: ["Hold & Nudge"],
      description: "An honest three-reeler with classic hold and nudge play.",
      maxPrize: 100,
    },
    {
      id: "reel-king",
      name: "Reel King",
      type: "Classic",
      features: ["Bonus Round"],
      description: "A modern take on the old-school AWP cabinet.",
      maxPrize: 100,
    },
    {
      id: "big-banker",
      name: "Big Banker",
      type: "Jackpot",
      features: ["Progressive"],
      description: "A standalone progressive that ticks up across the day.",
      maxPrize: 500,
    },
  ] as Game[],
  promotions: [
    {
      id: "weekend-welcome",
      title: "Weekend Welcome",
      description:
        "Complimentary tea, coffee and pastries for every player on Saturday and Sunday mornings.",
      startsOn: "Every Saturday",
      endsOn: "Every Sunday",
      badge: "Ongoing",
    },
    {
      id: "loyalty-club",
      title: "The Webbers Club",
      description:
        "Sign up at the cashier for member-only invites, birthday surprises and early access to new machines.",
      startsOn: "Year-round",
      endsOn: "",
      badge: "Members",
    },
    {
      id: "community-jackpot-launch",
      title: "Community Jackpot is here",
      description:
        "Our new community progressive runs every evening from 6pm. Up to £500 max prize — play your part on any participating machine.",
      startsOn: "Daily",
      endsOn: "From 18:00",
      badge: "New",
    },
  ] as Promotion[],
};

export type SiteConfig = typeof siteConfig;
