import React, { useEffect, useState } from 'react';
import { useServerAction } from 'zsa-react';
import { FetchSuggestedService } from '@/actions/actions';
import { Option } from '@/types';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { TriangleAlertIcon } from 'lucide-react';

type SuggestedServiceButtonsProps = {
  addedCategories: string[];
  handleAddRow: (name: string) => void;
};

const SuggestedServiceButtons: React.FC<SuggestedServiceButtonsProps> = ({
  addedCategories,
  handleAddRow,
}) => {
  const [categories, setCategories] = useState<Option[]>([]);
  const { isPending, execute } = useServerAction(FetchSuggestedService);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const [result, err] = await execute({categoryId:1});
        
        if (!err) {
          setCategories(result || []);
        }
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      }
    };

    fetchCategories();
  }, [execute]);

  return (
    <>
      <div>Available Categories</div>
      {isPending ? (
        <Skeleton className="h-[125px] w-full rounded-xl" />
      ) : (
        <div className="mt-4 flex flex-wrap items-start justify-start gap-2">
          {categories.length ? (
            categories.map(
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
};

export default SuggestedServiceButtons;
