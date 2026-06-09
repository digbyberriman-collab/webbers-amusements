import { createFileRoute, Link } from "@tanstack/react-router";
import { siteConfig } from "@/config/site";
import { PageHero } from "@/components/PageHero";
import { Placeholder } from "@/components/Placeholder";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: `Website Terms — ${siteConfig.brand.name}` },
      {
        name: "description",
        content:
          "Terms of use for the Webbers Amusements website. Read these before you use the site.",
      },
      {
        property: "og:title",
        content: `Website Terms — ${siteConfig.brand.name}`,
      },
      {
        property: "og:description",
        content: "Terms of use for the Webbers Amusements website.",
      },
      { property: "og:url", content: "/terms" },
    ],
    links: [{ rel: "canonical", href: "/terms" }],
  }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <>
      <PageHero
        eyebrow="Website terms"
        title={
          <>
            Plain English.{" "}
            <span className="italic text-brass">Sensibly written.</span>
          </>
        }
        intro="The rules that apply when you use this website. Separate terms apply on the gaming floor — those are displayed in venue."
      />

      <section className="px-6 py-[var(--section-y)] lg:px-10">
        <article className="prose-editorial mx-auto max-w-3xl space-y-8 text-muted-foreground">
          <div className="rounded-2xl border border-brass/20 bg-brass/5 p-6 text-sm">
            <p className="eyebrow mb-2">Draft</p>
            <p>
              These terms are a working draft.{" "}
              <Placeholder>
                Please have your legal adviser review before publishing,
                particularly limitation-of-liability and jurisdiction
                clauses.
              </Placeholder>
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="font-display text-2xl text-foreground">
              About this website
            </h2>
            <p>
              webbersamusements.co.uk is operated by{" "}
              {siteConfig.brand.parent} (referred to as "we", "our" or
              "Webbers"). By accessing this site you agree to these terms.
              If you don't agree, please don't use the site.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="font-display text-2xl text-foreground">
              Age restriction
            </h2>
            <p>
              The content on this site relates to licensed Adult Gaming
              Centres. It is intended for those aged{" "}
              {siteConfig.compliance.minAge} and over. By continuing to
              use the site you confirm you meet this age requirement.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="font-display text-2xl text-foreground">
              Accuracy of information
            </h2>
            <p>
              We work hard to keep the information on this site accurate
              (opening hours, venue addresses, available cabinets) but we
              can't guarantee everything is current at every moment. Where
              accuracy matters — for example a long journey to a specific
              venue — please call the venue directly to confirm.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="font-display text-2xl text-foreground">
              Acceptable use
            </h2>
            <p>You agree not to:</p>
            <ul className="ml-5 list-disc space-y-2">
              <li>Use this site in any way that breaches UK law.</li>
              <li>
                Attempt to access areas of the site you are not
                authorised to access.
              </li>
              <li>
                Use automated tools to scrape content for commercial
                purposes.
              </li>
              <li>
                Upload or transmit any content that contains viruses or
                malicious code.
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h2 className="font-display text-2xl text-foreground">
              Intellectual property
            </h2>
            <p>
              All content on this site — text, photography, the Webbers
              monogram and design system — is owned by or licensed to{" "}
              {siteConfig.brand.parent}. You may share links to our pages
              but you may not reproduce, redistribute or modify the
              content without our written permission.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="font-display text-2xl text-foreground">
              Links to other sites
            </h2>
            <p>
              We link to third-party sites (such as BeGambleAware,
              GamCare and Google Maps) for your convenience. We are not
              responsible for the content of those sites and including a
              link does not imply endorsement.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="font-display text-2xl text-foreground">
              Liability
            </h2>
            <p>
              <Placeholder>
                Nothing in these terms excludes our liability for death or
                personal injury caused by negligence, fraud, or any other
                liability that cannot be excluded under UK law. Subject to
                that, our liability arising from your use of this website
                is limited as set out in the full clause to be confirmed.
              </Placeholder>
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="font-display text-2xl text-foreground">
              Governing law
            </h2>
            <p>
              These terms are governed by the laws of England and Wales.
              Any dispute will be subject to the exclusive jurisdiction of
              the courts of England and Wales.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="font-display text-2xl text-foreground">
              Contact
            </h2>
            <p>
              Questions about these terms? Email{" "}
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="text-brass underline-offset-4 hover:underline"
              >
                {siteConfig.contact.email}
              </a>.
            </p>
          </div>

          <p className="border-t border-white/5 pt-8 text-xs">
            See also: <Link to="/privacy" className="text-brass">privacy</Link>,{" "}
            <Link to="/cookies" className="text-brass">cookies</Link>,{" "}
            <Link to="/safer-gambling" className="text-brass">safer gambling</Link>.
          </p>
        </article>
      </section>
    </>
  );
}
