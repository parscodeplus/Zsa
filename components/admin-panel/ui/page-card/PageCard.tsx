"use client";
import * as React from "react";
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardContent, CardTitle, CardFooter } from "@/components/ui/card";
import { ArrowBigDown, ArrowBigUp, Eye, EyeOff } from "lucide-react";

export interface Page {
  id: string;
  title: string;
  icon: string;
}

export const mockPages: Page[] = [
  {
    id: "1",
    title: "Home",
    icon: "https://via.placeholder.com/24",
  },
  {
    id: "2",
    title: "About",
    icon: "https://via.placeholder.com/24",
  },
  {
    id: "3",
    title: "Contact",
    icon: "https://via.placeholder.com/24",
  },
  // Add more mock pages as needed
];

interface PageCardProps {
  page: Page;
  index: number;
  movePage: (fromIndex: number, toIndex: number) => void;
}

const PageCard: React.FC<PageCardProps> = ({ page, index, movePage }) => {
  const [isVisible, setIsVisible] = React.useState(true);
  const router = useRouter();

  const handleClick = () => {
    router.push(`/pages/${page.id}`);
  };

  const handleMoveUp = () => {
    if (index > 0) {
      movePage(index, index - 1);
    }
  };

  const handleMoveDown = () => {
    if (index < mockPages.length - 1) {
      movePage(index, index + 1);
    }
  };

  const toggleVisibility = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsVisible(prev => !prev);
  };

  return (
    <motion.div
      className="flex items-center p-0 mb-0 w-full cursor-pointer"
      onClick={handleClick}
      layout
      drag="y"
      dragConstraints={{ top: 0, bottom: 0 }}
      dragElastic={1}
    >
      <Card className="flex flex-row-reverse items-center justify-center w-full">
        <CardHeader className="flex flex-col items-end w-full">
          <button onClick={(e) => { e.stopPropagation(); handleMoveUp(); }}><ArrowBigUp /></button>
          <button onClick={(e) => { e.stopPropagation(); handleMoveDown(); }}><ArrowBigDown /></button>
        </CardHeader>
        <CardContent className="mt-6">
          <CardTitle className="font-semibold">{page.title}</CardTitle>
        </CardContent>
        <CardFooter className="mt-6">
          <button onClick={toggleVisibility}>
            {isVisible ? <Eye /> : <EyeOff />}
          </button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default PageCard;
