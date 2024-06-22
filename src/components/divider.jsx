import Styles from '@/components/header/header.module.css'
import { cn } from '@/lib/utils';
export const Divider = ({className = ''}) => (
  <div
    className={cn(` opacity-50 h-1 w-11/12 border-t flex justify-center items-center ${Styles.headerBorderColor}`,className)}
    style={{ height: "1px", }}
  ></div>
);
