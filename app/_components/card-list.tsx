
import PokemonCard from "./card"
import { Category } from "@/types"

export default async function CardList({ data }: { data: Category[] }) {
  return (
    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 sm:gap-2 md:grid-cols-3 md:gap-4 lg:grid-cols-4 lg:gap-5 xl:grid-cols-5 xl:gap-6">
      {data && data?.map((p) => (
        <PokemonCard key={p.id} id={p.id} name={p.name} />
      ))}
    </div>
  )
}
