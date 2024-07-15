'use client';
import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import TabList from './TabList';
import {
  BookmarkIcon,
  HomeIcon,
  InboxIcon,
  ShareIcon,
  Settings2Icon,
} from 'lucide-react';

const tabs = [
  { id: 'home', icon: HomeIcon, path: '/' },
  { id: 'bookmark', icon: BookmarkIcon, path: '/contact' },
  { id: 'share', icon: ShareIcon, path: '/hookform' },
  { id: 'inbox', icon: InboxIcon, path: '/login' },
  { id: 'settings', icon: Settings2Icon, path: '/demo' },
];

export const BottomNavigation: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const currentTabId = pathname.split('/')[1] || tabs[2].id; // Set the middle icon as default
  const [activeTab, setActiveTab] = useState(currentTabId);

  // useEffect(() => {
  //   setActiveTab(currentTabId);
  // }, [pathname, currentTabId]);

  return (
    <div className='fixed bottom-0 left-0 z-50  flex h-14 w-full items-center justify-center'>
      <div className='relative z-0  flex w-full items-center justify-center space-x-1 rounded-t-3xl border border-primary px-2 backdrop-blur-lg dark:border-secondary-foreground'>
        <TabList
          tabs={tabs}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      </div>
    </div>
  );
};
