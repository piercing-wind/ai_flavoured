'use client'
import Styles from '@/app/(x)/image/image.module.css'
import { useEffect, useState } from 'react';

export const ImagePageHeader = () => {
   const [htmlClass, setHtmlClass] = useState<string>('dark');

      useEffect(() => {
         const observer = new MutationObserver((mutations: MutationRecord[]) => {
            mutations.forEach((mutation: MutationRecord) => {
               if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                  setHtmlClass(document.documentElement.className);
               }
            });
         });
   
         observer.observe(document.documentElement, { attributes: true });
   
         return () => {
            observer.disconnect();
         };
      }, []);
      
   return<h1 className={`text-3xl md:text-5xl font-bold my-4 ${htmlClass=== 'dark' ? Styles.neonDark : Styles.neonLight}`}>AI Image Generator</h1>
}