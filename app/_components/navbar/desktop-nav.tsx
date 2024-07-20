"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { ChevronDown, ChevronUp } from "lucide-react";
import Logo from "./logo";
import { INavigationItem } from "./navigation";
import ThemeSwitch from "./theme-switch";
import { motion, AnimatePresence } from "framer-motion";
import { Separator } from "@/components/ui/separator";

export default function DesktopNav({ navigation }: { navigation: INavigationItem[] }) {
  const pathname = usePathname();
  const [openSubmenus, setOpenSubmenus] = useState<{ [key: string]: boolean }>({});

  const toggleSubmenu = (name: string) => {
    setOpenSubmenus((prevState) => ({
      ...prevState,
      [name]: !prevState[name],
    }));
  };

  const renderNavItems = (items: INavigationItem[]) =>
    items.map((item) => (
      <div key={item.name} className="relative group">
        {item.children ? (
          <>
            <button
              onClick={() => toggleSubmenu(item.name)}
              className="flex items-center py-2"
            >
              <span className={cn(
                "text-md transition-colors hover:text-foreground/80",
                pathname === item.href ? "font-bold text-foreground" : "text-foreground/60"
              )}>
                {item.icon && <item.icon className="mr-2 h-4 w-4" />}
                {item.name}
              </span>
              {openSubmenus[item.name] ? <ChevronUp className="ml-1" /> : <ChevronDown className="ml-1" />}
            </button>
            <AnimatePresence>
              {openSubmenus[item.name] && (
                <motion.div
                  className="ml-4 mt-2"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {renderNavItems(item.children)}
                </motion.div>
              )}
            </AnimatePresence>
          </>
        ) : item.name === 'line' ? (
          <Separator className="my-2" />
        ) : (
          <Link
            href={item.href}
            className={cn(
              "text-md transition-colors hover:text-foreground/80",
              pathname === item.href ? "font-bold text-foreground" : "text-foreground/60"
            )}
          >
            {item.icon && <item.icon className="mr-2 h-4 w-4" />}
            {item.name}
          </Link>
        )}
      </div>
    ));

  return (
    <>
      <div className="hidden items-center lg:flex lg:gap-x-6">
        <Logo />
        {renderNavItems(navigation)}
      </div>
      <div className="hidden lg:flex lg:flex-1 lg:justify-end">
        <ThemeSwitch />
      </div>
    </>
  );
}
