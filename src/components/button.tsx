import React from 'react';
import Styles from '@/components/ui/button.module.css'
import { actionAsyncStorage } from 'next/dist/client/components/action-async-storage.external';

export interface ButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  size?: 'default' | 'sm' | 'lg' | 'icon';
  disabled?: boolean;
  action?: ()=>void;
}

export const sizeClasses = {
  default: "h-10 px-4 py-2",
  sm: "h-9 rounded-md px-3",
  lg: "h-11 rounded-md px-8",
  icon: "h-10 w-10",
};

export const Button: React.FC<ButtonProps> = ({ onClick, children, className, size = 'default', disabled = false }) => {
  return (
    
    <button disabled={disabled} onClick={onClick} className={`inline-flex items-center justify-center whitespace-nowrap rounded-md font-bold ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer border border-input bg-background ${className} ${Styles.button} ${sizeClasses[size]}`}>
      {children}
    </button>
  );
};
