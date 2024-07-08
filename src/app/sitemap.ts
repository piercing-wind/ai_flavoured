import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return [
    {
      url: `${process.env.WEBSITE_URL}/`,
      lastModified: new Date("2024-06-26T05:16:04.409Z"),
      priority: 1,
      changeFrequency: "monthly",
    },
    {
      url: `${process.env.WEBSITE_URL}/chat`,
      lastModified: new Date("2024-06-26T05:16:04.409Z"),
    },
    {
      url: `${process.env.WEBSITE_URL}/aipresentation`,
      lastModified: new Date("2024-06-26T05:16:04.409Z"),
    },
    {
      url: `${process.env.WEBSITE_URL}/voice`,
      lastModified: new Date("2024-06-26T05:16:04.409Z"),
    },
    {
      url: `${process.env.WEBSITE_URL}/image`,
      lastModified: new Date("2024-06-26T05:16:04.409Z"),
    },
    {
      url : `${process.env.WEBSITE_URL}/login`,
      lastModified: new Date("2024-06-26T05:16:04.409Z"),
    }
    ,{
      url : `${process.env.WEBSITE_URL}/flavours`,
      lastModified: new Date("2024-06-26T05:16:04.409Z"),
    }
  ];
}
