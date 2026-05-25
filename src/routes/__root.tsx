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

function NotFoundComponent() {
  return (
    <SiteShell>
      <section className="flex min-h-[70vh] items-center justify-center px-6 pt-32">
        <div className="max-w-md text-center">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-gold">
            404
          </p>
          <h1 className="mt-4 font-display text-5xl text-foreground">
            We can't find that page.
          </h1>
          <p className="mt-4 text-muted-foreground">
            The page may have moved, or never existed. Let's get you back on the
            floor.
          </p>
          <Link
            to="/"
            className="mt-8 inline-flex rounded-full bg-gold px-6 py-3 text-sm font-semibold text-ink hover:bg-gold-deep"
          >
            Back to home
          </Link>
        </div>
      </section>
    </SiteShell>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  return (
    <SiteShell>
      <section className="flex min-h-[70vh] items-center justify-center px-6 pt-32">
        <div className="max-w-md text-center">
          <h1 className="font-display text-4xl text-foreground">
            This page didn't load.
          </h1>
          <p className="mt-4 text-muted-foreground">
            Something went wrong on our end. Try again, or head back home.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <button
              type="button"
              onClick={() => {
                router.invalidate();
                reset();
              }}
              className="rounded-full bg-gold px-6 py-3 text-sm font-semibold text-ink hover:bg-gold-deep"
            >
              Try again
            </button>
            <a
              href="/"
              className="rounded-full border border-white/10 px-6 py-3 text-sm font-semibold text-foreground hover:bg-white/5"
            >
              Go home
            </a>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: `${siteConfig.brand.name} — ${siteConfig.brand.tagline}` },
      {
        name: "description",
        content: siteConfig.brand.description,
      },
      { name: "rating", content: "adult" },
      { name: "theme-color", content: "#0A0E14" },
      { property: "og:site_name", content: siteConfig.brand.name },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
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
        href: "https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400..900;1,9..144,400..900&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap",
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: siteConfig.brand.parent,
          alternateName: siteConfig.brand.name,
          foundingDate: String(siteConfig.brand.foundedYear),
          description: siteConfig.brand.description,
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
    <html lang="en-GB">
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
