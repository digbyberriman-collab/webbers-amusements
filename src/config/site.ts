// Single source of truth for Webbers content.
// All venue addresses, phones and games verified against the client's current site.

import placeholderVenue from "@/assets/placeholder-venue.svg";

export type DayHours = { open: string; close: string } | { closed: true };
export type WeeklyHours = Record<
  "mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun",
  DayHours
>;

export interface VenuePhotos {
  hero: string;
  gallery: string[];
}

export interface TeamMember {
  name: string;
  role: string;
  portrait: string;
  bio?: string;
}

export interface Venue {
  slug: string;
  name: string;
  /** Subsidiary brand displayed on signage at this venue. */
  signage: "Webbers Amusements" | "Webbers Casino Slots";
  city: string;
  region: string;
  address: string[];
  postcode: string;
  phone: string;
  email?: string;
  lat: number;
  lng: number;
  hours: WeeklyHours;
  primary?: boolean;
  /** One-line venue character used on cards. */
  character: string;
  /** Short evocative phrase used in the venue-page hero. */
  tagline?: string;
  /** Placeholder photo set — swap paths in this file when real photography arrives. */
  photos: VenuePhotos;
  /** Per-venue team. Names are placeholders until client supplies real data. */
  team: TeamMember[];
  /** Keys from siteConfig.facilities that this venue offers. */
  facilities: string[];
  parkingNotes?: string;
  transportNotes?: string;
}

export interface Game {
  id: string;
  name: string;
  category:
    | "Megaways"
    | "Cash Collect"
    | "Classic Reels"
    | "Festive Slots"
    | "Reel Ways"
    | "Roulette";
  ways?: string;
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

export interface Facility {
  key: string;
  label: string;
  /** lucide-react icon name — looked up in the venue detail page. */
  icon: string;
}

const standardHours: WeeklyHours = {
  mon: { open: "09:00", close: "22:00" },
  tue: { open: "09:00", close: "22:00" },
  wed: { open: "09:00", close: "22:00" },
  thu: { open: "09:00", close: "22:00" },
  fri: { open: "09:00", close: "22:00" },
  sat: { open: "09:00", close: "22:00" },
  sun: { open: "10:00", close: "20:00" },
};

/** Shared photo placeholder. Replace per-venue paths in `venues[*].photos`
 *  and `venues[*].team[*].portrait` when real imagery arrives. */
const PLACEHOLDER = placeholderVenue;

const placeholderPhotos: VenuePhotos = {
  hero: PLACEHOLDER,
  gallery: [PLACEHOLDER, PLACEHOLDER, PLACEHOLDER, PLACEHOLDER],
};

/** Three role slots used across every venue for layout consistency.
 *  Names read [CLIENT TO CONFIRM] until the client supplies real data. */
const placeholderTeam: TeamMember[] = [
  {
    name: "[CLIENT TO CONFIRM]",
    role: "Venue Manager",
    portrait: PLACEHOLDER,
    bio: "Leads the room, runs the rota and looks after every regular by name.",
  },
  {
    name: "[CLIENT TO CONFIRM]",
    role: "Floor Host",
    portrait: PLACEHOLDER,
    bio: "First face most visitors meet — answers questions, fixes the tea and watches the room.",
  },
  {
    name: "[CLIENT TO CONFIRM]",
    role: "Cashier Lead",
    portrait: PLACEHOLDER,
    bio: "Handles cashier services, member sign-ups and safer-gambling conversations.",
  },
];

export const siteConfig = {
  brand: {
    name: "Webbers Amusements",
    short: "Webbers",
    parent: "Webber Leisure",
    foundedYear: 1954,
    founder: "Arthur Webber Senior",
    origin: "Rhyl, North Wales",
    tagline: "Premium adult gaming. British heritage. Since 1954.",
    description:
      "A multi-generational family entertainment business — from 1950s seaside arcades to premium adult gaming centres across North Wales, Chester and Greater Manchester. Licensed by the UK Gambling Commission, longstanding Bacta member.",
    shortDescription:
      "Three generations of British entertainment heritage — modern, premium adult gaming, in well-run arcades.",
  },
  compliance: {
    licenceNumber: "[CLIENT TO CONFIRM LICENCE NUMBER]",
    helpline: "0808 8020 133",
    minAge: 18,
    maxSlotPrize: 500,
    regulator: "UK Gambling Commission",
    tradeBody: "Bacta",
    idPolicy: "Think 25",
  },
  contact: {
    email: "hello@webbersamusements.co.uk", // [CLIENT TO CONFIRM EMAIL]
    socials: {
      instagram: "#",
      facebook: "#",
    },
  },
  /** Premium gaming hardware partners — used as trust marks. */
  partners: [
    "Light & Wonder",
    "Novomatic",
    "Blueprint Gaming",
    "Inspired Gaming",
  ] as const,
  /** Operational pillars — used in trust / why-Webbers strips. */
  trustMarks: [
    {
      key: "licensed",
      label: "UK Gambling Commission Licensed",
      detail: "Fully regulated AGC operator",
    },
    {
      key: "bacta",
      label: "Bacta Member",
      detail: "Longstanding trade body member",
    },
    {
      key: "think25",
      label: "Think 25 ID Policy",
      detail: "Strict 18+ entry across every venue",
    },
    {
      key: "family",
      label: "Family Run Since 1954",
      detail: "Three generations of the Webber family",
    },
  ],
  /** Master facility checklist. Each venue ticks the keys it offers. */
  facilities: [
    { key: "wifi", label: "Free Wi-Fi", icon: "Wifi" },
    {
      key: "refreshments",
      label: "Complimentary tea, coffee & soft drinks",
      icon: "Coffee",
    },
    { key: "cashier", label: "Staffed cashier desk", icon: "BadgePoundSterling" },
    { key: "atm", label: "ATM on site", icon: "Landmark" },
    { key: "accessible", label: "Step-free entrance", icon: "Accessibility" },
    { key: "hearing-loop", label: "Hearing loop available", icon: "Ear" },
    { key: "members", label: "Webbers Club sign-up in venue", icon: "UserPlus" },
    {
      key: "safer-gambling",
      label: "Safer-gambling tools available",
      icon: "ShieldCheck",
    },
    { key: "parking", label: "Parking nearby", icon: "ParkingCircle" },
    { key: "transport", label: "Public transport links", icon: "Bus" },
  ] as Facility[],
  venues: [
    {
      slug: "chester-frodsham",
      name: "Webbers Chester · Frodsham Street",
      signage: "Webbers Amusements",
      city: "Chester",
      region: "Cheshire",
      address: ["28A Frodsham Street"],
      postcode: "CH1 3JL",
      phone: "01244 [CLIENT TO CONFIRM]",
      lat: 53.1934,
      lng: -2.8893,
      hours: standardHours,
      primary: true,
      character:
        "Our flagship arcade, two minutes from the Eastgate Clock — calm, well-lit, with the full modern floor.",
      tagline: "Two minutes from the Eastgate Clock.",
      photos: placeholderPhotos,
      team: placeholderTeam,
      facilities: [
        "wifi",
        "refreshments",
        "cashier",
        "atm",
        "accessible",
        "members",
        "safer-gambling",
        "transport",
      ],
      parkingNotes:
        "Several Chester city-centre car parks within a five-minute walk, including the Forum Shopping Centre car park and Pepper Street car park. [CLIENT TO CONFIRM nearest recommended.]",
      transportNotes:
        "Chester rail station is a short walk; frequent bus services stop on Foregate Street, two minutes away.",
    },
    {
      slug: "chester-northgate",
      name: "Webbers Chester · Northgate Street",
      signage: "Webbers Casino Slots",
      city: "Chester",
      region: "Cheshire",
      address: ["14 Northgate Street"],
      postcode: "CH1 2HA",
      phone: "01244 911062",
      lat: 53.1925,
      lng: -2.8912,
      hours: standardHours,
      character:
        "A boutique slots arcade a short walk from the Cathedral Quarter — curated cabinets, quieter pace.",
      tagline: "The Cathedral Quarter's quietest slots arcade.",
      photos: placeholderPhotos,
      team: placeholderTeam,
      facilities: [
        "wifi",
        "refreshments",
        "cashier",
        "accessible",
        "members",
        "safer-gambling",
        "transport",
      ],
      parkingNotes:
        "Forum Shopping Centre car park is a three-minute walk. On-street parking limited in the Cathedral Quarter — public car parks preferred.",
      transportNotes:
        "Chester rail station roughly eight minutes on foot; the Cathedral Quarter bus stops are nearby.",
    },
    {
      slug: "caernarfon",
      name: "Webbers Caernarfon",
      signage: "Webbers Casino Slots",
      city: "Caernarfon",
      region: "Gwynedd",
      address: ["2 Pool Street"],
      postcode: "LL55 2AB",
      phone: "01286 672758",
      lat: 53.1399,
      lng: -4.2722,
      hours: standardHours,
      character:
        "In the shadow of the castle walls — a long-running family fixture in the heart of the old town.",
      tagline: "In the shadow of the castle walls.",
      photos: placeholderPhotos,
      team: placeholderTeam,
      facilities: [
        "wifi",
        "refreshments",
        "cashier",
        "accessible",
        "members",
        "safer-gambling",
        "parking",
      ],
      parkingNotes:
        "Castle Square car park is a four-minute walk; additional Pay & Display parking available on adjacent streets. [CLIENT TO CONFIRM preferred recommendation.]",
      transportNotes:
        "Bus stops on Bridge Street, two minutes away. Caernarfon is served by frequent Bangor services.",
    },
    {
      slug: "rhyl",
      name: "Webbers Rhyl",
      signage: "Webbers Casino Slots",
      city: "Rhyl",
      region: "Denbighshire",
      address: ["76 High Street"],
      postcode: "LL18 1UB",
      phone: "01745 353251",
      lat: 53.3201,
      lng: -3.4914,
      hours: standardHours,
      character:
        "Where the Webber story started in the 1950s — still on the High Street, now in its modern form.",
      tagline: "Where the Webber story started, in 1954.",
      photos: placeholderPhotos,
      team: placeholderTeam,
      facilities: [
        "wifi",
        "refreshments",
        "cashier",
        "accessible",
        "members",
        "safer-gambling",
        "transport",
      ],
      parkingNotes:
        "Several town-centre car parks within a few minutes' walk. [CLIENT TO CONFIRM preferred recommendation.]",
      transportNotes:
        "Rhyl rail station is a seven-minute walk; bus services stop on the High Street directly outside.",
    },
    {
      slug: "walkden",
      name: "Webbers Walkden",
      signage: "Webbers Amusements",
      city: "Walkden",
      region: "Greater Manchester",
      address: ["35 Bolton Road"],
      postcode: "M28 3AX",
      phone: "0161 222 0282",
      lat: 53.5232,
      lng: -2.3973,
      hours: standardHours,
      character:
        "Our newest arcade — a generous floor on the high street, a few minutes' drive from the M60.",
      tagline: "A few minutes' drive from the M60.",
      photos: placeholderPhotos,
      team: placeholderTeam,
      facilities: [
        "wifi",
        "refreshments",
        "cashier",
        "atm",
        "accessible",
        "members",
        "safer-gambling",
        "parking",
      ],
      parkingNotes:
        "On-street parking on Bolton Road and adjacent side streets. [CLIENT TO CONFIRM dedicated customer parking, if any.]",
      transportNotes:
        "Walkden rail station is a four-minute walk; M60 Junction 14 is approximately four minutes by car.",
    },
  ] as Venue[],
  games: [
    {
      id: "big-cat-king-megaways",
      name: "Big Cat King Megaways",
      category: "Megaways",
      ways: "Up to 15,625 ways to win",
      description:
        "Fast-paced Megaways action — rule the reels with the Big Cat King.",
      maxPrize: 500,
      isFeatured: true,
    },
    {
      id: "huff-n-more-puff",
      name: "Huff n' More Puff",
      category: "Reel Ways",
      description:
        "High-energy gameplay with Reel Ways mechanics — huff, puff and blow your way to big wins.",
      maxPrize: 500,
      isFeatured: true,
    },
    {
      id: "fortune-of-cai-shen",
      name: "Fortune of Cai Shen",
      category: "Cash Collect",
      ways: "4,096 ways to win",
      description:
        "Cash Collect feature with a massive 4,096 ways to win. Chase the fortune of the Chinese god of wealth.",
      maxPrize: 500,
      isFeatured: true,
    },
    {
      id: "double-zero-roulette",
      name: "Double Zero Roulette with Golden Odds",
      category: "Roulette",
      description:
        "Classic Double Zero Roulette with Golden Odds. Win up to £500 — place your bets and let the wheel decide.",
      maxPrize: 500,
      isFeatured: true,
    },
    {
      id: "searing-sevens",
      name: "Searing Sevens Super Spins",
      category: "Classic Reels",
      description:
        "A classic reel experience with Free Spins. Timeless fruit-machine action with a fiery modern twist.",
      maxPrize: 500,
    },
    {
      id: "big-catch-bass-fishing-christmas",
      name: "Big Catch Bass Fishing Christmas",
      category: "Festive Slots",
      description:
        "Festive fishing fun with exciting Free Games bonus rounds. Cast your line and reel in the wins this Christmas.",
      maxPrize: 500,
      isNew: true,
    },
  ] as Game[],
  promotions: [
    {
      id: "weekend-welcome",
      title: "The Weekend Welcome",
      description:
        "Complimentary tea, coffee and pastries for every player, every Saturday and Sunday morning. A small Webber-family thank-you for choosing the arcade.",
      startsOn: "Every Saturday",
      endsOn: "Every Sunday",
      badge: "Ongoing",
    },
    {
      id: "webbers-club",
      title: "The Webbers Club",
      description:
        "Member-only invites, birthday cards from the team, and early access to new cabinets — register at the cashier on your next visit.",
      startsOn: "Year-round",
      endsOn: "",
      badge: "Members",
    },
    {
      id: "new-cabinets",
      title: "New on the Floor",
      description:
        "Fresh titles from Light & Wonder, Blueprint and Inspired Gaming land regularly across the estate. Speak to staff in venue to find what's new this month.",
      startsOn: "Updated monthly",
      endsOn: "",
      badge: "Just landed",
    },
  ] as Promotion[],
  /** Heritage timeline — used on Home, About and storytelling sections. */
  timeline: [
    {
      decade: "1954",
      title: "Arthur Webber Senior begins",
      body: "Arthur Webber Senior founds the family business in Rhyl, North Wales — manufacturing confectionery supplied to the Woolworths counter and the seaside trade.",
    },
    {
      decade: "1960s",
      title: "Onto the seafront",
      body: "The family moves into fairgrounds and seaside arcades along the North Wales coast — penny falls, classic AWP cabinets and a knack for keeping the arcades warm and well-run.",
    },
    {
      decade: "1970s",
      title: "Rides and family entertainment",
      body: "Expansion into fairground rides and family entertainment centres — a generation of children grow up with a Webber-run amusement in their summer holidays.",
    },
    {
      decade: "1990s",
      title: "Permanent arcades",
      body: "Permanent amusement arcades open across North Wales, including the long-standing Rhyl and Caernarfon venues — anchoring the family on the high street.",
    },
    {
      decade: "2000s",
      title: "Across the border into Chester",
      body: "The first Chester venue opens, bringing the family's hospitality standards into a cathedral city for the first time.",
    },
    {
      decade: "2010s",
      title: "Modern Adult Gaming Centres",
      body: "The estate modernises into premium, fully-licensed AGCs — sophisticated arcades with the latest cabinets from Light & Wonder, Novomatic, Blueprint and Inspired Gaming.",
    },
    {
      decade: "Today",
      title: "Three generations on",
      body: "Five arcades across Chester, North Wales and Greater Manchester. Same family, same standards — modern premium gaming, regulated by the UK Gambling Commission.",
    },
  ],
};

export type SiteConfig = typeof siteConfig;
