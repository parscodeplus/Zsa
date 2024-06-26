// IconModel.ts
'use client';
import { LucideIcon, Scale } from 'lucide-react';
import { motion } from 'framer-motion';

export interface IconModel {
  icon: any | LucideIcon | React.ComponentType<React.SVGProps<SVGSVGElement>>;
  text: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

type Props = {
  item: IconModel;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

const Navigation: React.FC<Props> = ({ item, onClick }) => {
  const { icon, text } = item;
const [active, setActive] = useState(0);

  return (
    <motion.button
      onClick={onClick}
      type='button'
      className='group inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800'
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0, transition: { duration: 0.3 } }}
      whileFocus={{ scale: 1.1 }}
      whileHover={{ scale: 1.1, rotate: 10 }}
    >
      {icon}
      <span className='text-sm text-gray-500 group-hover:text-blue-600 dark:text-gray-400 dark:group-hover:text-blue-500'>
        {text}
      </span>
    </motion.button>
  );
};

// MyComponent.tsx
import React, { useState } from 'react';

const ButtonNavigation: React.FC<{ icons: IconModel[] }> = ({ icons }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0, transition: { duration: 1 } }}
      className='fixed bottom-0 left-0 z-50 h-16 w-full rounded-t-sm border-t border-gray-200 bg-white dark:border-gray-600 dark:bg-gray-700'
    >
      <div className='mx-auto grid h-full max-w-lg grid-cols-4'>
        {icons.map((item, index) => (
          <Navigation key={index} item={item} onClick={item.onClick} />
        ))}
      </div>
    </motion.div>
  );
};

export default ButtonNavigation;
