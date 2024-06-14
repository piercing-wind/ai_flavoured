'use server'

import { dbq } from "@/db/db";

export const getSubscriptionQuota = async (id: any) => {
      try {
        const quota = await dbq('SELECT * FROM "subscriptionQuota" WHERE "userId" = $1', [id]);
        return quota;
      } catch (error) { 
        return null;
      }
    };

export const getAiPresentationQuota = async (id: any) => {
      try {
        const quota = await dbq('SELECT "aipresentation" FROM "subscriptionQuota" WHERE "userId" = $1', [id]);
        return quota.aipresentation;
      } catch (error) { 
        return null;
      }
  }
