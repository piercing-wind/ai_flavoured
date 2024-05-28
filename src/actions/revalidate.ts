'use server';
import { revalidatePath } from 'next/cache'
export const revalidate = (pathname: string) => {
      revalidatePath(pathname);
}