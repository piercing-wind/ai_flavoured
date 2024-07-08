"use client"

import * as React from "react"
import { Moon, Sun, Computer } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function ModeToggle({children}:{children?:React.ReactNode}) {
  const { setTheme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div>
          {children ? children : <Sun className="h-[1.2rem] w-[1.2rem] transition-all" />}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")} className="flex justify-between items-center">
        <Sun className="h-[1.2rem] w-[1.2rem] transition-all" />
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")} className="flex justify-between items-center">
         <Moon className=" h-[1.2rem] w-[1.2rem] transition-all " />
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")} className="flex justify-between items-center">
        <Computer className="h-[1.2rem] w-[1.2rem]  transition-all " />
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
