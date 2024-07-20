"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Menu, ChevronDown, ChevronUp } from 'lucide-react';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import Logo from './logo';
import { INavigationItem } from './navigation';
import ThemeSwitch from './theme-switch';
import { motion, AnimatePresence } from 'framer-motion';
import { Separator } from "@/components/ui/separator";

export default function MobileNav({
  navigation,
}: {
  navigation: INavigationItem[];
}) {
  const pathname = usePathname();
  const [openSheet, setOpenSheet] = useState(false);
  const [openSubmenus, setOpenSubmenus] = useState<{ [key: string]: boolean }>(
    {},
  );

  const toggleSubmenu = (name: string) => {
    setOpenSubmenus((prevState) => ({
      ...prevState,
      [name]: !prevState[name],
    }));
  };

  const renderNavItems = (items: INavigationItem[]) =>
    items.map((item) => (
      <div key={item.name}>
        {item.children ? (
          <div>
            <button
              onClick={() => toggleSubmenu(item.name)}
              className={`flex w-full items-center justify-between py-2`}
            >
              <span
                className={cn(
                  '-mx-3 block rounded-lg px-3 py-2 text-sm transition-colors hover:text-foreground/80',
                  pathname === item.href
                    ? 'font-bold text-foreground'
                    : 'text-foreground/60',
                )}
              >
                <div className='flex flex-row gap-2 space-x-2'>
                  {item.icon && <item.icon className='mr-2 h-4 w-4' />}
                  {item.name}
                </div>
              </span>
              {openSubmenus[item.name] ? <ChevronUp /> : <ChevronDown />}
            </button>
            <AnimatePresence>
              {openSubmenus[item.name] && (
                <motion.div
                  className='mr-8 mt-2'
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {renderNavItems(item.children)}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ) : item.name === 'line' ? (
          <Separator className='my-2' />
        ) : (
          <SheetClose asChild>
            <Link
              href={item.href}
              className={cn(
                '-mx-3 block rounded-lg px-3 py-2 text-sm transition-colors hover:text-foreground/80',
                pathname === item.href
                  ? 'font-bold text-foreground'
                  : 'text-foreground/60',
              )}
            >
              <div className='flex flex-row gap-2 space-x-2'>
                {item.icon && <item.icon className='mr-2 h-4 w-4' />}
                {item.name}
              </div>
            </Link>
          </SheetClose>
        )}
      </div>
    ));

  return (
    <div dir={'ltr'} className='flex flex-grow justify-between lg:hidden'>
      <Logo />
      <div className='flex items-center gap-x-2'>
        <ThemeSwitch />
        <Sheet open={openSheet} onOpenChange={setOpenSheet}>
          <SheetTrigger asChild>
            <button
              type='button'
              className='-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700 dark:text-white'
            >
              <span className='sr-only'>Open main menu</span>
              <Menu className='h-6 w-6' aria-hidden='true' />
            </button>
          </SheetTrigger>
          <SheetContent className='fixed inset-y-0 right-0 max-w-sm overflow-y-auto sm:border-l-2'>
            <SheetHeader>
              <SheetTitle className='flex justify-start'>
                <Logo />
              </SheetTitle>
            </SheetHeader>
            <div className='mt-6 flow-root'>
              <div className='-my-6 divide-y divide-gray-500/10 dark:divide-white/50'>
                <div className='space-y-2 py-6'>
                  {renderNavItems(navigation)}
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}
