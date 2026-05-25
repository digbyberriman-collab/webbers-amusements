import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";
import { SiteShell } from "@/components/layout/SiteShell";
import { siteConfig } from "@/config/site";

const DEFAULT_TITLE = `${siteConfig.brand.name} — ${siteConfig.brand.tagline}`;
const DEFAULT_DESCRIPTION = siteConfig.brand.description;

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <p className="eyebrow">Error 404</p>
        <h1 className="mt-4 font-display text-5xl text-foreground">
          Page not found
        </h1>
        <p className="mt-3 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-8">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full bg-brass px-6 py-3 text-sm font-semibold text-ink transition-colors hover:bg-brass-deep"
          >
            Return home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <p className="eyebrow">Something went wrong</p>
        <h1 className="mt-4 font-display text-3xl text-foreground">
          This page didn't load.
        </h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Try refreshing, or head back to the home page.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-full bg-brass px-6 py-3 text-sm font-semibold text-ink transition-colors hover:bg-brass-deep"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-full border border-white/10 px-6 py-3 text-sm font-medium text-foreground transition-colors hover:border-brass hover:text-brass"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "theme-color", content: "#0c1422" },
      { title: DEFAULT_TITLE },
      { name: "description", content: DEFAULT_DESCRIPTION },
      { name: "author", content: siteConfig.brand.parent },
      { name: "robots", content: "index,follow,max-image-preview:large" },

      { property: "og:site_name", content: siteConfig.brand.name },
      { property: "og:title", content: DEFAULT_TITLE },
      { property: "og:description", content: DEFAULT_DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "en_GB" },

      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: DEFAULT_TITLE },
      { name: "twitter:description", content: DEFAULT_DESCRIPTION },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@500;600&display=swap",
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: siteConfig.brand.name,
          legalName: siteConfig.brand.parent,
          foundingDate: String(siteConfig.brand.foundedYear),
          foundingLocation: siteConfig.brand.origin,
          founder: {
            "@type": "Person",
            name: siteConfig.brand.founder,
          },
          description: siteConfig.brand.description,
          memberOf: { "@type": "Organization", name: "Bacta" },
          location: siteConfig.venues.map((v) => ({
            "@type": "Place",
            name: v.name,
            address: {
              "@type": "PostalAddress",
              streetAddress: v.address.join(", "),
              addressLocality: v.city,
              addressRegion: v.region,
              postalCode: v.postcode,
              addressCountry: "GB",
            },
          })),
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <SiteShell>
        <Outlet />
      </SiteShell>
    </QueryClientProvider>
  );
}
