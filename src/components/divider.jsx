import Styles from '@/components/header/header.module.css'
export const Divider = () => (
  <div
    className={` opacity-50 h-1 w-11/12 border-t flex justify-center items-center ${Styles.headerBorderColor}`}
    style={{ height: "1px", }}
  ></div>
);
