import { Suspense } from "react"

import { GetCategory } from "@/actions/actions"
import InfiniteCardList from "../_components/infinite-card-list"
import SearchPokemon from "../_components/search"
import SkeletonCardList from "../_components/skeleton"

export default async function InfiniteScrollPage({
  searchParams,
}: {
  searchParams?: {
    query?: string
  }
}) {
  const search = searchParams?.query || ""
  const limit = 2

  const { data: initialData } = await GetCategory({ search, limit })

  return (
    <>
      <div className="mb-3">
        <SearchPokemon />
      </div>
      <Suspense key={search} fallback={<SkeletonCardList />}>
        <InfiniteCardList search={search} initialData={initialData} limit={limit} />
      </Suspense>
    </>
  )
}
