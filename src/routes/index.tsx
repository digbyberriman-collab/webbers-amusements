import { createFileRoute } from "@tanstack/react-router";
import { siteConfig } from "@/config/site";
import {
  Hero,
  TrustStrip,
  HeritageTimeline,
  CinematicBreak,
  AttractionsShowcase,
  PartnersStrip,
  ExperienceSection,
  PartnershipSection,
  WhatsOn,
  Gallery,
  Testimonials,
  FinalCta,
} from "@/components/home";
import floorWideImg from "@/assets/floor-wide.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title: `${siteConfig.brand.name} — Premium adult gaming, family-run since 1954`,
      },
      {
        name: "description",
        content:
          "Three generations of British entertainment heritage — premium adult gaming centres in Chester, North Wales and Greater Manchester. Family-run since 1954. Licensed by the UK Gambling Commission. Strictly 18+.",
      },
      {
        property: "og:title",
        content: `${siteConfig.brand.name} — ${siteConfig.brand.tagline}`,
      },
      { property: "og:description", content: siteConfig.brand.description },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          name: siteConfig.brand.name,
          description: siteConfig.brand.description,
          foundingDate: String(siteConfig.brand.foundedYear),
          telephone: siteConfig.venues[0].phone,
          address: siteConfig.venues.map((v) => ({
            "@type": "PostalAddress",
            streetAddress: v.address.join(", "),
            addressLocality: v.city,
            addressRegion: v.region,
            postalCode: v.postcode,
            addressCountry: "GB",
          })),
        }),
      },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <>
      {/* 1 · Immersive parallax hero */}
      <Hero />

      {/* 2 · Operational trust marks */}
      <TrustStrip />

      {/* 3 · Scroll-driven heritage timeline */}
      <HeritageTimeline />

      {/* 4 · Cinematic floor break */}
      <CinematicBreak
        image={floorWideImg}
        imageAlt="Inside a Webbers gaming arcade — low lighting, premium cabinets, a calm atmosphere."
        eyebrow="Step inside"
        title="Arcades designed for the spin."
        body="Warm low light, plush carpet, and rows of the latest premium cabinets from the four most respected names in the industry."
      />

      {/* 5 · Gaming floor showcase (carousel) */}
      <AttractionsShowcase />

      {/* 6 · Hardware partners */}
      <PartnersStrip />

      {/* 7 · Experience — split layout + animated counters */}
      <ExperienceSection />

      {/* 8 · B2B sites & partnerships */}
      <PartnershipSection />

      {/* 9 · Locations + What's On */}
      <WhatsOn />

      {/* 10 · Gallery */}
      <Gallery />

      {/* 11 · Testimonials / trust */}
      <Testimonials />

      {/* 12 · Final conversion CTA */}
      <FinalCta />
    </>
  );
}
