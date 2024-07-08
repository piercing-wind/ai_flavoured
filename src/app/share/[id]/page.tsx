import { fetchShareUrl } from '@/actions/userPromptImage/userPromptImage';
import { Metadata } from 'next';
import Image from 'next/image';

export async function generateMetadata({ params }: { params: { id: string } }) :Promise<Metadata> {
   const image = await fetchShareUrl(params.id);
   return {
    metadataBase : new URL(process.env.WEBSITE_URL!),
    title: "Check out this amazing AI image I created with AI Flavoured! 😃",
    description: "Look at this awesome image I just made using AI Flavoured! The possibilities are endless with AI creativity. You should try it and share your own creations! #AIFlavoured #AICreativity #AIArt",
    openGraph: {
      images: [
         {
            url: image.url,
            width: 1200,
            height: 630,
            alt: "Ai Flavoured Image"
         }
      ]
    }
   }
}


export default async function SharePage({ params }: { params: { id: string } }) {
     const image = await fetchShareUrl(params.id);
   return (
         <div className='relative w-[80%] h-[80rem] m-auto'>
            <Image src={image.url} alt="Ai Flavoured Image" fill style={{
               objectFit: 'cover',
            }} />
         </div>
   );
}
