import { Key } from "react";
import MinimalFragranceCard from "./MinimalFragranceCard"

interface FavoritesProps {
    favoriteFragrances: any[];
    showFragrancePage: (fragranceId: string) => void;
}

const Favorites: React.FC<FavoritesProps> = ({ favoriteFragrances, showFragrancePage }) => {
  return (
    <div className='w-full'>
        <h1 className='text-2xl font-semibold dark:text-white'>Favorites</h1>
        <div className="flex gap-[1rem] mt-5 flex-wrap">
            {favoriteFragrances.map(fragrance => (
                <MinimalFragranceCard
                    key={fragrance._id}
                    fragranceName={fragrance.name}
                    fragranceBrand={fragrance.brand}
                    fragranceImage={fragrance.image}
                    fragranceId={fragrance._id}
                    onCardClick={() => showFragrancePage(fragrance._id)}
                />
            ))}
        </div>
    </div>
  )
}

export default Favorites