import { NextRequest } from "next/server";
import { google } from 'googleapis';

export async function POST(req: NextRequest) {
      console.log('working')
      const customsearch = google.customsearch('v1');
      const googleAPIKey = process.env.GOOGLE_API_KEY;
      const searchEngineId = process.env.GOOGLE_SEARCH_ENGINE_ID;
      const query  = 'porn boobs';
      try {
            const response = await customsearch.cse.list({
              cx: searchEngineId,
              q: query,
              searchType: 'image',
              num: 30,
              key: googleAPIKey,
            });
            console.log(response.data);
            return Response.json({ response: response.data.items});
      } catch (error) {
            console.log(error);
           return Response.json({ message: "Error" }); 
      }
}
