'use client';
import TabItem from './TabItem';
import { FC } from 'react';

interface Tab {
  id: string;
  icon: FC<{ className?: string }>;
  path: string;
}

interface TabListProps {
  tabs: Tab[];
  activeTab: string;
  setActiveTab: (id: string) => void;
}

const TabList: FC<TabListProps> = ({ tabs, activeTab, setActiveTab }) => {
  return (
    <div className="relative z-0 flex w-full items-center justify-center space-x-1 rounded-t-2xl text-primary-foreground p-2 ">
      {tabs.map((tab) => (
        <TabItem
          key={tab.id}
          tab={tab}
          isActive={activeTab === tab.id}
          onClick={setActiveTab}
        />
      ))}
    </div>
  );
};

export default TabList;
