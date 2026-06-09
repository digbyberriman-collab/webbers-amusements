import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { siteConfig } from "@/config/site";

const BASE_URL = "";

// Build-time constant — fresh on every deploy, signals to crawlers that
// the site has been touched recently.
const LAST_MOD = new Date().toISOString().slice(0, 10);

interface SitemapEntry {
  path: string;
  changefreq: "weekly" | "monthly" | "yearly";
  priority: string;
}

const baseEntries: SitemapEntry[] = [
  { path: "/", changefreq: "weekly", priority: "1.0" },
  { path: "/games", changefreq: "weekly", priority: "0.9" },
  { path: "/venues", changefreq: "monthly", priority: "0.9" },
  { path: "/about", changefreq: "monthly", priority: "0.7" },
  { path: "/promotions", changefreq: "weekly", priority: "0.7" },
  { path: "/safer-gambling", changefreq: "monthly", priority: "0.7" },
  { path: "/news", changefreq: "weekly", priority: "0.6" },
  { path: "/careers", changefreq: "monthly", priority: "0.6" },
  { path: "/contact", changefreq: "monthly", priority: "0.6" },
  { path: "/faq", changefreq: "monthly", priority: "0.5" },
  { path: "/privacy", changefreq: "yearly", priority: "0.3" },
  { path: "/cookies", changefreq: "yearly", priority: "0.3" },
  { path: "/terms", changefreq: "yearly", priority: "0.3" },
];

const venueEntries: SitemapEntry[] = siteConfig.venues.map((v) => ({
  path: `/venues/${v.slug}`,
  changefreq: "monthly",
  // Boost the newest venue so search engines pick it up first
  priority: v.isJustOpened ? "1.0" : "0.8",
}));

const entries: SitemapEntry[] = [...baseEntries, ...venueEntries];

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          ...entries.map((e) =>
            [
              `  <url>`,
              `    <loc>${BASE_URL}${e.path}</loc>`,
              `    <lastmod>${LAST_MOD}</lastmod>`,
              `    <changefreq>${e.changefreq}</changefreq>`,
              `    <priority>${e.priority}</priority>`,
              `  </url>`,
            ].join("\n"),
          ),
          `</urlset>`,
        ].join("\n");
        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
