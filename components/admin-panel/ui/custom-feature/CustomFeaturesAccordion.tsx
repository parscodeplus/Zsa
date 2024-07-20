import * as React from 'react';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';
import FeatureItem, { FeatureGroup } from './FeatureItem'; // Make sure this path is correct

interface CustomFeaturesAccordionProps {
  featureGroups: FeatureGroup[];
  onToggleFeature: (id: string, isActive: boolean) => void;
}

export const CustomFeaturesAccordion: React.FC<CustomFeaturesAccordionProps> = ({
  featureGroups,
  onToggleFeature,
}) => {
  return (
    <Accordion type='single' collapsible className='w-full'>
      {featureGroups.map((group) => (
        <AccordionItem key={group.id} value={group.id}>
          <AccordionTrigger>{group.name}</AccordionTrigger>
          <AccordionContent>
            {group.features.map((feature) => (
              <FeatureItem
                key={feature.id}
                feature={feature}
                onToggle={onToggleFeature}
              />
            ))}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};
