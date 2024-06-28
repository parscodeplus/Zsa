'use client';
import { motion } from 'framer-motion';
import { useState } from 'react';
import {
  BookmarkIcon,
  HomeIcon,
  InboxIcon,
  ShareIcon,
  Settings2Icon,
} from 'lucide-react';
import { Button } from './ui/button';

let tabs = [
  { id: 'home', icon: HomeIcon },
  { id: 'bookmark', icon: BookmarkIcon },
  { id: 'share', icon: ShareIcon },
  { id: 'inbox', icon: InboxIcon },
  { id: 'settings', icon: Settings2Icon },
];

function BottomNavigation() {
  let [activeTab, setActiveTab] = useState(tabs[0].id);

  return (
    <div className='fixed bottom-0 left-0 z-50 flex h-14 w-full items-center justify-center bg-transparent'>
      <div className='z-0 flex w-full items-center justify-center space-x-1  rounded-t-2xl bg-primary p-4 dark:bg-background'>
        {tabs.map((tab) => (
          <div
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`${
              activeTab === tab.id ? 'relative' : 'hover:text-white/60'
            } relative rounded-full px-2 py-1.5 text-sm font-medium text-foreground outline-sky-400 transition focus-visible:outline-2`}
            style={{
              WebkitTapHighlightColor: 'transparent',
            }}
          >
            {activeTab === tab.id && (
              <motion.span
                layoutId='bubble'
                className='inner-circle absolute inset-0 -z-10 bg-primary dark:bg-background'
                style={{ borderRadius: 9999, top: -22 }}
                transition={{ type: 'spring', bounce: 0.3, duration: 0.6 }}
              />
            )}
            <div className='flex flex-col items-center justify-center'>
              <button
                className={`transition-top relative flex h-11 w-11 items-center justify-center rounded-full bg-blue-600 text-white shadow-[0px_2px_0px_0px_#FFFFFF40_inset] duration-300 hover:bg-blue-700 ${
                  activeTab === tab.id
                    ? '-top-1 '
                    : 'top-0 mix-blend-normal'
                }`}
              >
                <tab.icon
                  className={`transition-top relative h-6 w-6 duration-1000 ${
                    activeTab === tab.id
                      ? '-top-1  text-white '
                      : 'top-0 text-gray-400 mix-blend-normal'
                  }`}
                />
              </button>
              <div className='text-white'>{activeTab === tab.id && tab.id}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BottomNavigation;
