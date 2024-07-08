import Image from "next/image";
import Styles from "@/app/(x)/image/image.module.css";

export const ImageCarouselEffect = ({ images }: { images: string[] }) => {
  return (
    <div
      className={`flex w-full items-center justify-start my-4 flex-shrink-0 space-x-4 py-2 px-4 overflow-x-auto overflow-y-hidden ${Styles.chatscroll}`}
    >
      {images.map((image, index) => (
        <div
          key={index}
          className={`relative h-[20rem] sm:h-[30rem] md:h-[35rem] lg:h-[40rem] flex-shrink-0 py-4 rounded-md overflow-hidden`}
        >
          <Image
            src={image}
            alt={`Dall-E ${index}`}
            height={640}
            width={0}
            sizes="100vw"
            style={{
              height: "100%",
              width: "auto",
              borderRadius: "10px",
              objectFit: "cover",
            }}
          />
        </div>
      ))}
    </div>
  );
};
