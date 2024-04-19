"use client";
import { MdLightMode } from "react-icons/md";
import { BsFillMoonStarsFill } from "react-icons/bs";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";

export function ThemeSwitch() {
  const [mounted, setMounted] = useState(false);
  const { setTheme, resolvedTheme } = useTheme();

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <div className="flex justify-between px-2 space-x-1 rounded-md right-0" style={{ border: '0.5px solid #4d2f4fd8' }}>
    <button 
        onClick={() => setTheme('light')} 
        className={`p-1 my-0.5 rounded-md transition-colors duration-700 ${resolvedTheme === 'light' ? ' bg-pink-600' : ''}`}
      >
        <MdLightMode />
      </button>
      <button 
        onClick={() => setTheme('dark')} 
        className={`p-1 my-0.5 rounded-md transition-colors duration-700 ${resolvedTheme === 'dark' ? ' bg-pink-600' : ''}`}
      >
        <BsFillMoonStarsFill />
      </button>
    </div>
  );
}
