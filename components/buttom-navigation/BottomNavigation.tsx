'use client';
import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import TabList from './TabList';
import {
  BookmarkIcon,
  HomeIcon,
  InboxIcon,
  ShareIcon,
  Settings2Icon,Calendar, BookOpen, User,Info,LayoutDashboard 
} from 'lucide-react';
const tabs = [
  { id: 'home', icon: HomeIcon, path: '/' },
  { id: 'bookmark', icon: LayoutDashboard, path: '/contact' },
  { id: 'share', icon: Calendar, path: '/hookform' },
  { id: 'inbox', icon: Info, path: '/admin/plugin' },
  { id: 'settings', icon: User, path: '/demo' },
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
    <div className='fixed bottom-0 left-0 z-50 flex h-14 w-full items-center justify-center sm:hidden'>
      <div className='relative z-0 flex w-full items-center justify-center space-x-1  rounded-t-xl  shadow-[0_3px_10px_rgb(0,0,0,0.2)] backdrop-blur-lg border'>
        <TabList
          tabs={tabs}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      </div>
    </div>
  );
};
