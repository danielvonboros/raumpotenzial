import type { MetadataRoute } from "next";
import { de } from "@/content/de";

const base = "https://www.raumideenwerk.com";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${base}/`, changeFrequency: "monthly", priority: 1 },
    ...de.projects.items.map((project) => ({
      url: `${base}/projekte/${project.slug}`,
      changeFrequency: "yearly" as const,
      priority: 0.7,
    })),
    { url: `${base}/impressum`, changeFrequency: "yearly", priority: 0.2 },
  ];
}
