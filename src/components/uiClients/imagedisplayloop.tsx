'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';


export const ImageDisplayLoop = ({images}:{images:string[]}) => {

   const [currentImage, setCurrentImage] = useState(images[0]);

   useEffect(() => {
      const timer = setInterval(() => {
        setCurrentImage(prevImage => {
          const currentIndex = images.indexOf(prevImage);
          const nextIndex = (currentIndex + 1) % images.length;
          return images[nextIndex];
        });
      }, 3000);
    
      // Cleanup function to clear the interval when the component unmounts
      return () => clearInterval(timer);
    }, [images]);
   return (
    <div className='relative max-h-[14rem] sm:max-h-[18rem] max-w-[22rem] sm:max-w-[29rem] rounded-xl overflow-hidden w-full' style={{ height: '18rem' , width : '29rem' }}>
      {images.map((image, index) => (
          <div
             key={image}
             className={`absolute top-0 left-0 rounded-xl overflow-hidden w-full h-full transition-opacity duration-1000 ease-in-out ${
               currentImage === image ? 'opacity-100' : 'opacity-0'
             }`}
           >
             <Image
               src={image}
               alt={`Dalle-3 image ${index}`}
               fill
               style={{ objectFit: 'cover', borderRadius: 'inherit' }}
             />
           </div>
      ))}
    </div>
   )
}