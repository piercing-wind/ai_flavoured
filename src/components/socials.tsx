import Image from "next/image";


const SocialPNG=({ path,className="", size= 32} :{path:string, className?:string, size?: number})=>{
   return(
      <div className={className}>
      <Image
      src={path}
      alt="social"
      width={size}
      height={size}
      />
      </div>
   )
}
export default SocialPNG;

const SocialSVG=({path, className="", size = 32}:{path:string ,className?: string, size?:number})=>{
   return(
      <div className={className}>
      <Image
      src={path}
      alt="social"
      width={size}
      height={size}
      />
      </div>
   )
}
export  {SocialSVG};