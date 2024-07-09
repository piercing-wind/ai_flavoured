import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
   const currentDate = new Date().toISOString();
  return [
    {
      url: `${process.env.WEBSITE_URL}/`,
      lastModified: new Date(currentDate),
      priority: 1,
      changeFrequency: "monthly",
    },
    {
      url: `${process.env.WEBSITE_URL}/chat`,
      lastModified: new Date(currentDate),
      priority : 0.9,
    },
    {
      url: `${process.env.WEBSITE_URL}/aipresentation`,
      lastModified: new Date(currentDate),
      priority : 0.9,
    },
    {
      url: `${process.env.WEBSITE_URL}/image`,
      lastModified: new Date(currentDate),
      priority : 0.7,
    },
    {
      url: `${process.env.WEBSITE_URL}/audio`,
      lastModified: new Date(currentDate),
      priority : 0.7,
    },
    {
      url : `${process.env.WEBSITE_URL}/register`,
      lastModified: new Date(currentDate),
    },
    {
      url : `${process.env.WEBSITE_URL}/login`,
      lastModified: new Date(currentDate),
    }
    ,{
      url : `${process.env.WEBSITE_URL}/flavours`,
      lastModified: new Date(currentDate),
      priority : 0.5,
    }
    ,{
      url : `${process.env.WEBSITE_URL}/about`,
      lastModified: new Date(currentDate),
      priority : 0.5,
    }
  ];
}
