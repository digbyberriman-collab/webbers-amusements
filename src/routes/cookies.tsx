import { createFileRoute, Link } from "@tanstack/react-router";
import { siteConfig } from "@/config/site";
import { PageHero } from "@/components/PageHero";
import { Placeholder } from "@/components/Placeholder";

export const Route = createFileRoute("/cookies")({
  head: () => ({
    meta: [
      { title: `Cookie Policy — ${siteConfig.brand.name}` },
      {
        name: "description",
        content:
          "How webbersamusements.co.uk uses cookies and similar technologies, and how to manage your preferences.",
      },
      {
        property: "og:title",
        content: `Cookie Policy — ${siteConfig.brand.name}`,
      },
      {
        property: "og:description",
        content:
          "Cookie policy for the Webbers Amusements website.",
      },
      { property: "og:url", content: "/cookies" },
    ],
    links: [{ rel: "canonical", href: "/cookies" }],
  }),
  component: CookiesPage,
});

function CookiesPage() {
  return (
    <>
      <PageHero
        eyebrow="Cookie policy"
        title={
          <>
            Just enough to{" "}
            <span className="italic text-brass">keep the site running.</span>
          </>
        }
        intro="What cookies we use, why we use them, and how to manage them. We don't sell your data."
      />

      <section className="px-6 py-[var(--section-y)] lg:px-10">
        <article className="prose-editorial mx-auto max-w-3xl space-y-8 text-muted-foreground">
          <div className="rounded-2xl border border-brass/20 bg-brass/5 p-6 text-sm">
            <p className="eyebrow mb-2">Draft</p>
            <p>
              This policy is a working draft based on standard practice for a
              UK leisure-operator website.{" "}
              <Placeholder>
                Please confirm the actual cookies used in production with
                your developer / analytics provider before publishing.
              </Placeholder>
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="font-display text-2xl text-foreground">What are cookies?</h2>
            <p>
              Cookies are small text files that a website stores on your
              device. They allow the site to remember things like whether
              you've confirmed your age, what theme you prefer, and how
              you got here — without storing anything that personally
              identifies you.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="font-display text-2xl text-foreground">
              Cookies we use
            </h2>

            <div className="overflow-hidden rounded-2xl ring-1 ring-white/10">
              <table className="w-full text-left text-sm">
                <thead className="bg-surface/40">
                  <tr>
                    <th className="px-5 py-4 font-mono text-[10px] uppercase tracking-[0.22em] text-brass">
                      Cookie
                    </th>
                    <th className="px-5 py-4 font-mono text-[10px] uppercase tracking-[0.22em] text-brass">
                      Purpose
                    </th>
                    <th className="px-5 py-4 font-mono text-[10px] uppercase tracking-[0.22em] text-brass">
                      Lifetime
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 bg-ink/50">
                  <tr>
                    <td className="px-5 py-4 font-mono text-xs text-foreground">
                      webbers:age-confirmed
                    </td>
                    <td className="px-5 py-4">
                      Remembers that you've confirmed you're 18+. Strictly
                      necessary.
                    </td>
                    <td className="px-5 py-4">Local storage, indefinite</td>
                  </tr>
                  <tr>
                    <td className="px-5 py-4 font-mono text-xs text-foreground">
                      <Placeholder>_ga / analytics</Placeholder>
                    </td>
                    <td className="px-5 py-4">
                      <Placeholder>
                        Anonymous visit measurement — pages viewed, device
                        type, approximate region. Loaded only with your
                        consent.
                      </Placeholder>
                    </td>
                    <td className="px-5 py-4">
                      <Placeholder>2 years</Placeholder>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="font-display text-2xl text-foreground">
              How to manage them
            </h2>
            <p>
              You can clear cookies at any time through your browser
              settings, or use private / incognito mode to browse without
              persistent cookies. Doing so will reset the age-gate, so
              you'll be asked to confirm your age again.
            </p>
            <p>
              For analytics specifically,{" "}
              <Placeholder>
                we will provide a consent banner allowing you to accept or
                decline non-essential cookies.
              </Placeholder>
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="font-display text-2xl text-foreground">
              Third-party cookies
            </h2>
            <p>
              Embedded content (such as the OpenStreetMap embed on venue
              pages) may set its own cookies governed by those providers'
              policies. We do not control those cookies.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="font-display text-2xl text-foreground">
              Contact
            </h2>
            <p>
              Questions about cookies on this site? Email{" "}
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="text-brass underline-offset-4 hover:underline"
              >
                {siteConfig.contact.email}
              </a>.
            </p>
          </div>

          <p className="border-t border-white/5 pt-8 text-xs">
            See also: <Link to="/privacy" className="text-brass">privacy policy</Link>,{" "}
            <Link to="/terms" className="text-brass">website terms</Link>.
          </p>
        </article>
      </section>
    </>
  );
}
