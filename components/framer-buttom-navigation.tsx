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
import LinearGradient from "@/components/magicui/linear-gradient";
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
      <div className={`relative z-0 flex w-full items-center justify-center space-x-1  rounded-t-2xl bg-primary p-2  dark:bg-background`}>
        {tabs.map((tab) => (
          <div
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`${
              activeTab === tab.id ? 'relative' : 'hover:text-white/60'
            } relative rounded-full px-2  text-sm font-medium text-foreground outline-sky-400 transition focus-visible:outline-2`}
            style={{
              WebkitTapHighlightColor: 'transparent',
            }}
          >
            {activeTab === tab.id && (
              <motion.span
                layoutId='bubble'
                className=' absolute inset-0 -z-10 bg-primary dark:bg-background'
                style={{ borderRadius: 9999, top: -10 }}
                transition={{ type: 'spring', bounce: 0.3, duration: 0.6 }}
              />
            )}
            <div className='flex flex-col items-center justify-center my-1'>
              <button
                className={`transition-top relative flex h-11 w-11 items-center justify-center  bg-transparent  duration-300 ${
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
              <div className={`transition-top relative duration-500 ${
                    activeTab === tab.id
                      ? '-top-3  text-white '
                      : 'top-1 text-gray-400 mix-blend-normal'
                  } `}>{activeTab === tab.id && tab.id}</div>
            </div>
          </div>
        ))}
        {/* <LinearGradient direction='top'/> */}
      </div>
    </div>
  );
}

export default BottomNavigation;
