import * as React from 'react';
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

// ????? ???????? ????? ?? ???????? ? ???????
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

const FeatureItem: React.FC<FeatureItemProps> = ({ feature, onToggle }) => {
  const router = useRouter();
  const handleToggle = (checked: boolean) => {
    const isChecked = checked;
    onToggle(feature.id, isChecked);
    if (isChecked) {
      router.push(`/features/${feature.id}`);
    }
  };

  // Map feature status to badge variant
  const getBadgeVariant = (status: FeatureStatus) => {
    switch (status) {
      case 'FREE':
        return 'success';
      case 'POPULAR':
        return 'info';
      case 'MARKETING':
        return 'warning';
      case 'NEW':
        return 'secondary';
      default:
        return 'default';
    }
  };

  return (
    <div className='relative mb-4 flex w-full items-center rounded-lg border p-5'>
      <div className='absolute left-5 top-1'>
        <Badge variant={getBadgeVariant(feature.status)}>{feature.status}</Badge>
      </div>
      <User className='ml-1 mr-1 h-12 w-12 object-cover' />
      {/* <img src={feature.image || "https://via.placeholder.com/150"} alt={`${feature.title} icon`} className="w-12 h-12 mr-4 object-cover" /> */}
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

interface CustomFeaturesAccordionProps {
  featureGroups: FeatureGroup[];
  onToggleFeature: (id: string, isActive: boolean) => void;
}

export const CustomFeaturesAccordion: React.FC<
  CustomFeaturesAccordionProps
> = ({ featureGroups, onToggleFeature }) => {
  return (
    <Accordion type='single' collapsible className='w-full'>
      {featureGroups.map((group) => (
        <AccordionItem key={group.id} value={group.id}>
          <AccordionTrigger>{group.name}</AccordionTrigger>
          <AccordionContent>
            {group.features.map((feature) => (
              <>
                <FeatureItem
                  key={feature.id}
                  feature={feature}
                  onToggle={onToggleFeature}
                />
              </>
            ))}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};
