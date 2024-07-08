import {PrismaClient} from '@prisma/client'

declare global {
      var prisma : PrismaClient | undefined;
}

export const db = globalThis.prisma ||  new PrismaClient();
// console.log(process.env.NODE_ENV);
if (process.env.NODE_ENV !== "production") globalThis.prisma = db;