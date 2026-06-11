// Single source of truth for Webbers content.
// All venue addresses, phones and games verified against the client's current site.

import placeholderVenue from "@/assets/placeholder-venue.svg";

export type DayHours = { open: string; close: string } | { closed: true };
export type WeeklyHours = Record<"mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun", DayHours>;

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
    parent: "Webber's Leisure Ltd",
    foundedYear: 1954,
    founder: "Arthur Webber Senior",
    origin: "Rhyl, North Wales",
    tagline: "Premium adult gaming. British heritage. Since 1954.",
    description:
      "A multi-generational family entertainment business — from 1950s seaside arcades to premium adult gaming centres across North Wales, Chester and Greater Manchester. Licensed by the UK Gambling Commission, longstanding Bacta member.",
    shortDescription:
      "Four generations of British entertainment heritage — modern, premium adult gaming, in well-run arcades.",
  },
  /** Registered company office — required for regulated-operator display. */
  registeredOffice: {
    company: "Webber's Leisure Ltd",
    address: ["78 High Street"],
    city: "Rhyl",
    postcode: "LL18 1UB",
  },
  compliance: {
    licenceNumber: "048400-N-326542-007",
    licenceType: "Non-Remote — Gaming Machine General Adult Gaming Centre",
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
      instagram: "https://www.instagram.com/webberscasinoslots",
      facebook: "https://www.facebook.com/profile.php?id=61589225037599",
    },
  },
  /** Premium gaming hardware partners — used as trust marks. */
  partners: ["Light & Wonder", "Novomatic", "Blueprint Gaming", "Inspired Gaming"] as const,
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
      detail: "Four generations of the Webber family",
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
      address: ["28 Frodsham Street"],
      postcode: "CH1 3JL",
      phone: "01244 325544",
      lat: 53.1934,
      lng: -2.8893,
      hours: standardHours,
      primary: true,
      character:
        "Our flagship arcade, two minutes from the Eastgate Clock — calm, well-lit, with the full modern floor.",
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
      address: ["78 High Street"],
      postcode: "LL18 1UB",
      phone: "01745 353460",
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
      address: ["Unit 152 Lady Harriet Walk"],
      postcode: "M28 3ZH",
      phone: "0161 222 0282",
      lat: 53.5247,
      lng: -2.3968,
      hours: standardHours,
      character:
        "Our newest arcade — a generous floor on the high street, a few minutes' drive from the M60.",
    },
  ] as Venue[],
  games: [
    {
      id: "big-cat-king-megaways",
      name: "Big Cat King Megaways",
      category: "Megaways",
      ways: "Up to 15,625 ways to win",
      description: "Fast-paced Megaways action — rule the reels with the Big Cat King.",
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
      body: "Arthur Webber Senior founds the family business in Rhyl, North Wales — a confectionery manufacturer supplying the Woolworths High Street chain across the UK and the North Wales seaside trade.",
    },
    {
      decade: "1960s",
      title: "Onto the Rhyl seafront",
      body: "A decade later the sons Arthur and Michael Webber expand onto the Rhyl seafront fairground — operating the dodgems, the famous wooden Figure of 8 roller coaster, and children's rides — and open three large family amusement arcades on the promenade: Webbers Fun City, Lucky Strike and the Black Cat.",
    },
    {
      decade: "1970s",
      title: "Along the North Wales coast",
      body: "The brand expands west along the coast — opening amusement arcades at Ffrith Beach and Central Beach in Prestatyn, a generation of children growing up with a Webber-run amusement in their summer holidays.",
    },
    {
      decade: "1980s",
      title: "Caernarfon opens",
      body: "The small Caernarfon site opens in the heart of the old town — prize bingo and amusements, a long-running family fixture still operating today.",
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
      title: "Four generations on",
      body: "Five Adult Gaming Centres across Chester, North Wales and Greater Manchester. Same family, same standards — modern premium gaming, regulated by the UK Gambling Commission.",
    },
  ],
  /** B2B partnership offer — landlords, councils and commercial partners.
   *  Used in the home "Partnerships" section. CTA routes to /contact. */
  partnerships: {
    eyebrow: "Sites & partnerships",
    title: "Bring a Webbers arcade to your high street.",
    intro:
      "We're a long-established, fully-licensed operator actively looking for the right units and the right towns. If you manage a high-street property, run a regeneration scheme, or want a dependable name in a leisure space, we'd like to talk.",
    pillars: [
      {
        icon: "Building2",
        title: "Landlords & agents",
        body: "Reliable, long-lease tenants for high-street retail units. Covenant strength, tidy fit-outs and a venue that's looked after.",
      },
      {
        icon: "Landmark",
        title: "Councils & regeneration",
        body: "A regulated, responsible operator that brings footfall, local jobs and a well-run frontage to town-centre schemes.",
      },
      {
        icon: "Handshake",
        title: "Commercial partners",
        body: "Hardware suppliers, hospitality and local businesses — we keep long, straight relationships with people we work with.",
      },
      {
        icon: "Map",
        title: "New locations",
        body: "Actively acquiring across the North-West and North Wales. If you know a unit that would suit, put it in front of us.",
      },
    ],
  },
  /** Placeholder testimonials — illustrative copy to be replaced with
   *  verified reviews. Clearly flagged in the UI as samples. */
  testimonials: [
    {
      quote:
        "Spotless, calm and the staff actually know you. It's the only place I go — and they always put the kettle on.",
      name: "[CLIENT TO CONFIRM]",
      detail: "Regular · Chester, Frodsham Street",
      kind: "visitor" as const,
    },
    {
      quote:
        "Properly run, friendly and never pushy. You can tell it's a family business that takes pride in the place.",
      name: "[CLIENT TO CONFIRM]",
      detail: "Visitor · Rhyl",
      kind: "visitor" as const,
    },
    {
      quote:
        "A dependable, well-managed operator on the high street — exactly the kind of tenant a town centre wants.",
      name: "[CLIENT TO CONFIRM]",
      detail: "Commercial partner",
      kind: "partner" as const,
    },
  ],
};

export type SiteConfig = typeof siteConfig;
