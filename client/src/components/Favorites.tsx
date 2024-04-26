import { Key, useState } from "react";
import MinimalFragranceCard from "./MinimalFragranceCard";
import { IoHeartDislike } from "react-icons/io5";

interface FavoritesProps {
  favoriteFragrances: any[];
  showFragrancePage: (fragranceId: string) => void;
}

const Favorites: React.FC<FavoritesProps> = ({
  favoriteFragrances,
  showFragrancePage,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8); // Adjust if needed

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = favoriteFragrances.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalItems = favoriteFragrances.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="w-full">
      <div className="shadow flex gap-[1rem] mt-5 flex-wrap w-full h-fit rounded-lg box-border p-[15px] bg-neutral-100 border dark:border-white dark:bg-neutral-900 border-black border-opacity-10 dark:border-opacity-5">
        <div className="w-full flex justify-between">
          <h1 className="text-2xl font-semibold dark:text-white">Favorites</h1>
          <div className="flex gap-2">
            <button
              className="text-lg text-neutral-600 hover:text-black dark:text-neutral-300 transition dark:hover:text-white disabled:dark:hover:text-neutral-300 disabled:hover:text-neutral-600 w-[30px] h-[30px] rounded-full border dark:border-white border-black border-opacity-15 dark:border-opacity-5 flex justify-center items-center bg-neutral-50 dark:bg-neutral-900 disabled:hover:brightness-100 hover:brightness-95"
              onClick={prevPage}
              disabled={currentPage === 1}
            >
              ←
            </button>
            <button
              className="text-lg text-neutral-600 hover:text-black dark:text-neutral-300 transition dark:hover:text-white disabled:dark:hover:text-neutral-300 disabled:hover:text-neutral-600 w-[30px] h-[30px] rounded-full border dark:border-white border-black border-opacity-15 dark:border-opacity-5 flex justify-center items-center bg-neutral-50 dark:bg-neutral-900 disabled:hover:brightness-100 hover:brightness-95"
              onClick={nextPage}
              disabled={currentPage === totalPages}
            >
              →
            </button>
          </div>
        </div>
        {currentItems.length >= 1 ? (
          currentItems.map((fragrance) => (
            <MinimalFragranceCard
              key={fragrance._id}
              fragranceName={fragrance.name}
              fragranceBrand={fragrance.brand}
              fragranceImage={fragrance.image}
              fragranceId={fragrance._id}
              onCardClick={() => showFragrancePage(fragrance._id)}
            />
          ))
        ) : (
          <div className="w-full h-fit flex flex-col justify-center items-center">
            <div className="flex justify-center items-center w-[100px] h-[100px] border dark:border-white border-black border-opacity-15 dark:border-opacity-5 bg-neutral-50 dark:bg-neutral-800 rounded-full mb-2">
              <IoHeartDislike className="text-[50px] text-neutral-300 dark:text-neutral-700" />
            </div>
            <h1 className="text-lg font-semibold dark:text-white">
              No favorites yet
            </h1>
            <p className="text-sm text-neutral-500">
              There aren't any fragrances to your favorites at the moment
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;
