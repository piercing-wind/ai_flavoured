import Head from 'next/head';

export default function SharePage({ params }: { params: { id: string } }) {
     const image = decodeURIComponent(params.id); 
     console.log(image)
   return (
      <>
         <Head>
            <meta property="og:image" content={image} />
            {/* Add any other Open Graph tags you need */}
         </Head>

         {/* You can display the image here if you want */}
         <div>
            <img src={image} alt="Shared Image" />
         </div>
      </>
   );
}
