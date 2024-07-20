"use client"

import { useEffect, useState } from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { motion } from 'framer-motion';

export default function ThemeSwitch() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light")
  }

  return (
    <Button variant="ghost" size="icon" onClick={toggleTheme}>
      <motion.div
        className="relative"
        whileTap={{ scale: 0.8 }} // ??? ?? ???? ??????? ???? ???
      >
        <motion.div
          initial={{ rotate: 0, scale: 1 }}
          animate={{ rotate: theme === "dark" ? 90 : 0, scale: theme === "dark" ? 0 : 1 }}
          transition={{ duration: 0.5 }}
        >
          <Sun className="h-[1.0rem] w-[1.0rem]" />
        </motion.div>
        <motion.div
          className="absolute inset-0"
          initial={{ rotate: -90, scale: 0 }}
          animate={{ rotate: theme === "dark" ? 0 : -90, scale: theme === "dark" ? 1 : 0 }}
          transition={{ duration: 0.5 }}
        >
          <Moon className="h-[1.0rem] w-[1.0rem]" />
        </motion.div>
      </motion.div>
    </Button>
  )
}
