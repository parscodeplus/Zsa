import React from 'react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { TriangleAlertIcon } from 'lucide-react';
import { Option } from '@/types';

type CategoryButtonsProps = {
  isPending: boolean;
  data: Option[];
  addedCategories: string[];
  handleAddRow: (name: string) => void;
};

const CategoryButtons: React.FC<CategoryButtonsProps> = ({
  isPending,
  data = [],
  addedCategories,
  handleAddRow,
}) => (
  <>
    <div>Available Categories</div>
    {isPending ? (
      <Skeleton className="h-[125px] w-full rounded-xl" />
    ) : (
      <div className="mt-4 flex flex-wrap items-start justify-start gap-2">
        {data.length ? (
          data.map(
            (item, index) =>
              !addedCategories.includes(item.label) && (
                <Button
                  variant="outline"
                  className="rounded-l-full rounded-r-full"
                  onClick={() => handleAddRow(item.label)}
                  key={index}
                >
                  + {item.label}
                </Button>
              ),
          )
        ) : (
          <Alert variant="destructive" className="ml-2 rtl:ml-0">
            <TriangleAlertIcon className="h-4 w-4" />
            <AlertTitle>No Categories</AlertTitle>
            <AlertDescription>No categories available to add.</AlertDescription>
          </Alert>
        )}
      </div>
    )}
  </>
);

export default CategoryButtons;
