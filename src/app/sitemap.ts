import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
   const currentDate = new Date().toISOString();
   const website = process.env.WEBSITE_URL || 'https://aiflavoured.com';

   return [
    {
      url: `${website}/`,
      lastModified: new Date(currentDate),
      priority: 1,
      changeFrequency: "monthly",
    },
    {
      url: `${website}/chat`,
      lastModified: new Date(currentDate),
      priority : 0.8,
    },
    {
      url: `${website}/aipresentation`,
      lastModified: new Date(currentDate),
      priority : 0.9,
    },
    {
      url: `${website}/image`,
      lastModified: new Date(currentDate),
      priority : 0.7,
    },
    {
      url: `${website}/audio`,
      lastModified: new Date(currentDate),
      priority : 0.6,
    },
    {
      url : `${website}/register`,
      lastModified: new Date(currentDate),
    },
    {
      url : `${website}/login`,
      lastModified: new Date(currentDate),
    }
    ,{
      url : `${website}/flavours`,
      lastModified: new Date(currentDate),
      priority : 0.4,
    }
    ,{
      url : `${website}/about`,
      lastModified: new Date(currentDate),
      priority : 0.5,
    }
  ];
}
