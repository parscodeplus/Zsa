'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FC } from 'react';

interface TabItemProps {
  tab: { id: string, icon: FC<{ className?: string }>, path: string };
  isActive: boolean;
  onClick: (id: string) => void;
}

const TabItem: FC<TabItemProps> = ({ tab, isActive, onClick }) => {
  return (
    <Link href={tab.path}>
      <div
        onClick={() => onClick(tab.id)}
        className={`relative rounded-full px-2 text-sm font-medium text-foreground outline-sky-400 transition focus-visible:outline-2 ${
          isActive ? 'relative text-primary dark:text-primary-foreground' : 'hover:text-white/60'
        }`}
        style={{ WebkitTapHighlightColor: 'transparent' }}
      >
        {isActive && (
          <motion.span
            layoutId="bubble"
            className="absolute inset-0 -z-10 "
            style={{ borderRadius: 9999, top: -10 }}
            transition={{ type: 'spring', bounce: 0.3, duration: 0.6 }}
          />
        )}
        <div className="flex flex-col items-center justify-center my-1">
          <button
            className={`transition-top relative flex h-11 w-11 items-center justify-center bg-transparent duration-300 ${
              isActive ? '-top-1' : 'top-0 mix-blend-normal'
            }`}
          >
            <tab.icon
              className={`transition-top relative h-6 w-6 duration-300 text-primary dark:text-secondary ${
                isActive ? '-top-1 text-primary dark:text-secondary animate-bounce duration-1000' : 'top-0  mix-blend-normal'
              }`}
            />
          </button>
          <div
            className={`transition-top relative duration-300 ${
              isActive ? '-top-3  text-primary dark:text-secondary' : 'top-1  mix-blend-normal'
            }`}
          >
            {isActive && tab.id}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default TabItem;
