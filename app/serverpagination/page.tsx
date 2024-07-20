import { Suspense } from 'react';

import { GetCategory } from '@/actions/actions';
import CardList from '../_components/card-list';
import Pagination from '../_components/pagination';
import SearchPokemon from '../_components/search';
import SkeletonCardList from '../_components/skeleton';

export default async function ServerPaginationPage({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
    limit?: string;
  };
}) {
  const search = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  const limit = Number(searchParams?.limit) || 2;
  const offset = (currentPage - 1) * limit;

  const { data, totalPages } = await GetCategory({ offset, limit, search });

  return (
    <>
      <div className='mb-3 flex items-center justify-between gap-1'>
        <SearchPokemon />

        {totalPages && <Pagination totalPages={totalPages} />}
      </div>
      {data && (
        <Suspense key={search + currentPage} fallback={<SkeletonCardList />}>
          <CardList data={data} />
        </Suspense>
      )}
    </>
  );
}
