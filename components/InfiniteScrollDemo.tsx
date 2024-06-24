"use client"

'use client';
import React from 'react';
import InfiniteScroll from '@/components/ui/infinite-scroll';
import { Loader2 } from 'lucide-react';
import {  FindCategoryForInfiniteScroll } from '@/actions/actions';
import { category } from '@prisma/client';
interface DummyProductResponse {
  products: DummyProduct[];
  total: number;
  skip: number;
  limit: number;
}
interface CategoryResponse {
  Categorys: Category[];
  total: number;
  skip: number;
  limit: number;
}

interface Category {
  // id: number;
  name: string;
  description: string;
  // image?: string; // Optional property
  // isVisibleOnMainPage: boolean;
  // isFeatured?: boolean; // Optional property
  // position: number;
  // users: User[]; // Assuming you have a User model
  // service: Service[]; // Assuming you have a Service model
}

interface DummyProduct {
  id: number;
  title: string;
  price: string;
}

const Product = ({ product }: { product: DummyProduct }) => {
  return (
    <div className="flex w-full flex-col gap-2 rounded-lg border-2 border-gray-200 p-2">
      <div className="flex gap-2">
        <div className="flex flex-col justify-center gap-1">
          <div className="font-bold text-primary">
            {product.id} - {product.title}
          </div>
          <div className="text-sm text-muted-foreground">{product.price}</div>
        </div>
      </div>
    </div>
  );
};

const InfiniteScrollDemo = () => {
  const [page, setPage] = React.useState(0);
  const [loading, setLoading] = React.useState(false);
  const [hasMore, setHasMore] = React.useState(true);
  const [products, setProducts] = React.useState<DummyProduct[]>([]);
  const [categorys, setCategorys ] = React.useState<Category[]>([]);

  const next = async () => {
    console.log('start');
    
    setLoading(true);

    /**
     * Intentionally delay the search by 800ms before execution so that you can see the loading spinner.
     * In your app, you can remove this setTimeout.
     **/
    setTimeout(async () => {
      // const res = await fetch(
      //   `https://fakestoreapi.com/products?limit=1&skip=${3 * page}&select=title,price`,
      // );
      
      // const data = (await res.json()) as DummyProductResponse;
      const [data, err] = await FindCategoryForInfiniteScroll({
        skip:1,
        limit:1,
        page
      });
      const datas = (await data) as Category[];
       setCategorys(datas)
     
       setCategorys((prev) => [...prev, ...datas]);
       setPage((prev) => prev + 1);

      // // Usually your response will tell you if there is no more data.
      if (datas.length < 3) {
        setHasMore(false);
      }
      setLoading(false);
    }, 800);
  };
  return (
    <div className="max-h-[300px] w-full  overflow-y-auto px-10">
      <div className="flex w-full flex-col items-center  gap-3">
        {categorys && categorys.map((category,index) => (
               <div key={index}> {category.name} </div>
        ))}
        <InfiniteScroll hasMore={hasMore} isLoading={loading} next={next} threshold={1}>
          {hasMore && <Loader2 className="my-4 h-8 w-8 animate-spin" />}
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default InfiniteScrollDemo;
