import CSS from "@/app/myaccount/myaccount.module.css";
import { cn } from "@/lib/utils";
export const Free = ({className}:{className?:string}) => {
   return (
      <p className={cn(`text-xl uppercase ${className}` )}>Free</p>
   )
}

export const Pro = ({className}:{className?:string}) => {
   return (
      <p className={cn(`${CSS.animate_charcter} ${className} uppercase flex items-center tracking-wider`)} >Premium</p>
   )
}
export const Unlimited = ({className}:{className?:string}) => {
   return (
      <p className={cn(`${CSS.bgUnlimitedText} ${className}`)}>Unlimited</p>
   )
}

