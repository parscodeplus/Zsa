import * as React from "react"; 
import { useRouter } from 'next/navigation';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { User } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { FC, useEffect, useState } from 'react';

export interface Feature {
  id: string;
  title: string;
  shortDesc: string;
  longDesc?: string;
  image?: string;
  status: FeatureStatus;
  isActive: boolean;
  groupId: string;
}

export interface FeatureGroup {
  id: string;
  name: string;
  features: Feature[];
}

type FeatureStatus = 'FREE' | 'POPULAR' | 'MARKETING' | 'NEW';

interface FeatureItemProps {
  feature: Feature;
  onToggle: (id: string, isActive: boolean) => void;
}

const FeatureItem: FC<FeatureItemProps> = ({ feature, onToggle }) => {
  const router = useRouter();
  const badgeVariant = React.useMemo(() => {
    switch (feature.status) {
      case 'FREE':
        return 'رایگان';
      case 'POPULAR':
        return 'مبوب';
      case 'MARKETING':
        return 'بااریابی';
      case 'NEW':
        return 'جدید';
      default:
        return 'default';
    }
  }, [feature.status]);

  const handleToggle = (checked: boolean) => {
    const isChecked = checked;
    onToggle(feature.id, isChecked);
    if (isChecked) {
      router.push(`/admin/plugin/feature${feature.id}`);
    }
  };

//   alert('Feature Status:'+feature.status);
//   alert('Badge Variant:'+badgeVariant);

  return (
    <div className='relative mb-4 flex w-full items-center rounded-lg border p-5'>
      <div className='absolute left-5 top-1'>
        <Badge variant={feature.status}>{badgeVariant}</Badge>
      </div>
      <User className='ml-1 mr-1 h-12 w-12 object-cover' />
      <div className='flex-grow space-y-1'>
        <h3 className='font-semibold'>{feature.title}</h3>
        <p className='text-sm text-gray-600'>{feature.shortDesc}</p>
        <p className='text-xs text-gray-500'>Status: {feature.status}</p>
      </div>
      <div className='flex items-center space-x-2'>
        <Switch
          direction='rtl'
          id={`switch-${feature.id}`}
          checked={feature.isActive}
          onCheckedChange={handleToggle}
        />
        {/* <Label htmlFor={`switch-${feature.id}`}>Active</Label> */}
      </div>
    </div>
  );
};

export default FeatureItem;
