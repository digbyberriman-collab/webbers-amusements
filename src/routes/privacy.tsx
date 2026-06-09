import { createFileRoute, Link } from "@tanstack/react-router";
import { siteConfig } from "@/config/site";
import { PageHero } from "@/components/PageHero";
import { Placeholder } from "@/components/Placeholder";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: `Privacy Policy — ${siteConfig.brand.name}` },
      {
        name: "description",
        content:
          "How Webbers Amusements collects, uses and protects your personal information. UK GDPR compliant.",
      },
      {
        property: "og:title",
        content: `Privacy Policy — ${siteConfig.brand.name}`,
      },
      {
        property: "og:description",
        content:
          "How Webbers Amusements collects, uses and protects your personal information.",
      },
      { property: "og:url", content: "/privacy" },
    ],
    links: [{ rel: "canonical", href: "/privacy" }],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="Privacy policy"
        title={
          <>
            Your information is{" "}
            <span className="italic text-brass">looked after.</span>
          </>
        }
        intro="A plain-English summary of what we collect, how we use it, and the rights you have. The full policy follows."
      />

      <section className="px-6 py-[var(--section-y)] lg:px-10">
        <article className="prose-editorial mx-auto max-w-3xl space-y-8 text-muted-foreground">
          <div className="rounded-2xl border border-brass/20 bg-brass/5 p-6 text-sm">
            <p className="eyebrow mb-2">Draft</p>
            <p>
              This policy is provided as a working draft based on standard
              UK GDPR principles for a licensed AGC operator.{" "}
              <Placeholder>
                Please have your legal / data-protection adviser review and
                customise before publishing.
              </Placeholder>
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="font-display text-2xl text-foreground">Who we are</h2>
            <p>
              {siteConfig.brand.name} is operated by {siteConfig.brand.parent},
              a UK company registered in{" "}
              <Placeholder>England and Wales</Placeholder> under company number{" "}
              <Placeholder>[CLIENT TO CONFIRM company number]</Placeholder>.
              Our registered address is{" "}
              <Placeholder>[CLIENT TO CONFIRM registered address]</Placeholder>.
              For all data-protection enquiries please email{" "}
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="text-brass underline-offset-4 hover:underline"
              >
                {siteConfig.contact.email}
              </a>.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="font-display text-2xl text-foreground">
              What we collect
            </h2>
            <p>
              When you visit one of our Adult Gaming Centres or use this
              website, we may collect:
            </p>
            <ul className="ml-5 list-disc space-y-2">
              <li>
                <strong className="text-foreground">Identification data</strong>{" "}
                — name, date of birth and photo-ID details where required for
                age verification under our {siteConfig.compliance.idPolicy}{" "}
                policy.
              </li>
              <li>
                <strong className="text-foreground">Contact information</strong>{" "}
                — name, email and phone number when you sign up to the
                Webbers Club or submit an enquiry through this site.
              </li>
              <li>
                <strong className="text-foreground">CCTV footage</strong> —
                recorded across every venue for the safety of staff and
                customers, retained in line with our retention schedule.
              </li>
              <li>
                <strong className="text-foreground">Website analytics</strong>{" "}
                — anonymous data about how visitors use this site (pages
                viewed, device type, approximate region). See our{" "}
                <Link
                  to="/cookies"
                  className="text-brass underline-offset-4 hover:underline"
                >
                  cookie policy
                </Link>{" "}
                for detail.
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h2 className="font-display text-2xl text-foreground">
              Why we collect it
            </h2>
            <p>
              We process your data on the following lawful bases under
              UK GDPR:
            </p>
            <ul className="ml-5 list-disc space-y-2">
              <li>
                <strong className="text-foreground">Legal obligation</strong>{" "}
                — to comply with the conditions of our {siteConfig.compliance.regulator}{" "}
                operating licence, including age verification and
                safer-gambling responsibilities.
              </li>
              <li>
                <strong className="text-foreground">Legitimate interests</strong>{" "}
                — to safeguard our premises (CCTV), to prevent fraud and
                money-laundering, and to improve our services.
              </li>
              <li>
                <strong className="text-foreground">Consent</strong> —
                for optional marketing, newsletter sign-ups and analytics
                cookies that aren't strictly necessary.
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h2 className="font-display text-2xl text-foreground">
              Who we share it with
            </h2>
            <p>
              We do not sell your personal data. We may share information
              with:
            </p>
            <ul className="ml-5 list-disc space-y-2">
              <li>The {siteConfig.compliance.regulator} and law-enforcement bodies, where lawfully required.</li>
              <li>The {siteConfig.compliance.tradeBody} multi-operator self-exclusion scheme, if you ask to be enrolled.</li>
              <li>Trusted service providers (e.g. payment processors, IT and website hosting) under contracts that protect your data.</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h2 className="font-display text-2xl text-foreground">
              How long we keep it
            </h2>
            <p>
              We retain data only for as long as required by law or by our
              legitimate business needs.{" "}
              <Placeholder>
                Specific retention periods (CCTV, ID checks, self-exclusion
                records, marketing) to be confirmed in the published
                retention schedule.
              </Placeholder>
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="font-display text-2xl text-foreground">
              Your rights
            </h2>
            <p>
              Under UK GDPR you have the right to access the personal data
              we hold about you, to ask us to correct or delete it, to
              object to or restrict our processing, and to ask for
              portability of your data. To exercise any of these rights,
              email{" "}
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="text-brass underline-offset-4 hover:underline"
              >
                {siteConfig.contact.email}
              </a>{" "}
              and we'll respond within one month.
            </p>
            <p>
              You also have the right to complain to the Information
              Commissioner's Office (ICO) at{" "}
              <a
                href="https://ico.org.uk/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brass underline-offset-4 hover:underline"
              >
                ico.org.uk
              </a>.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="font-display text-2xl text-foreground">
              Changes to this policy
            </h2>
            <p>
              This policy was last updated on{" "}
              <Placeholder>[CLIENT TO CONFIRM publish date]</Placeholder>. We
              will publish material changes here and, where required, notify
              you directly.
            </p>
          </div>

          <p className="border-t border-white/5 pt-8 text-xs">
            See also: <Link to="/cookies" className="text-brass">cookie policy</Link>,{" "}
            <Link to="/terms" className="text-brass">website terms</Link>,{" "}
            <Link to="/safer-gambling" className="text-brass">safer gambling</Link>.
          </p>
        </article>
      </section>
    </>
  );
}
