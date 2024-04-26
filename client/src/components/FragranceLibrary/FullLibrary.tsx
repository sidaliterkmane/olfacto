import React, { useState } from "react";
import FragranceCard from "./FragranceCard";

import { IoSearch, IoLibraryOutline } from "react-icons/io5";

interface FullLibraryProps {
  fragrances: any[];
  toggleFragranceFavorite: (fragranceId: string, isFavorite: boolean) => void;
  isFragranceFavorite: (fragranceId: string) => boolean;
  showFragrancePage: (fragranceId: string) => void;
}

const FullLibrary: React.FC<FullLibraryProps> = ({
  fragrances,
  toggleFragranceFavorite,
  isFragranceFavorite,
  showFragrancePage,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(20); // Adjust if needed

  const filteredFragrances = fragrances.filter((fragrance) => {
    return (
      fragrance.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      fragrance.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      fragrance.type.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredFragrances.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalItems = filteredFragrances.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="flex flex-col gap-[2rem] box-border h-[90%] w-[103%]">
      <div className="w-full flex items-center justify-between">
        <h1 className="text-3xl font-semibold dark:text-white flex items-center gap-2">
          <IoLibraryOutline />
          Fragrance Library
        </h1>

        <div className="filters mr-[35px] flex gap-[1rem]">
          <div className="flex items-center gap-2">
            <IoSearch className="text-neutral-500" size={"20px"} />
            <input
              type="text"
              placeholder="Search fragrances..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-zinc-100 dark:bg-neutral-700 text-zinc-600 ring-1 ring-zinc-300 outline-none duration-300 placeholder:text-zinc-600 placeholder:opacity-50 placeholder:font-light rounded-md px-4 py-1 shadow focus:shadow-lg focus:bg-neutral-50 dark:ring-zinc-500 dark:placeholder:text-neutral-300 dark:text-neutral-200 dark:focus:bg-neutral-600"
            />
          </div>
          <div className="w-full flex justify-center items-center gap-5">
          <button
            className="text-sm text-neutral-600 hover:text-black dark:text-neutral-300 transition dark:hover:text-white disabled:dark:hover:text-neutral-300 disabled:hover:text-neutral-600"
            onClick={prevPage}
            disabled={currentPage === 1}
          >
            ← Prev
          </button>
          <p className="dark:text-white text-md">{currentPage}</p>
          <button
            className="text-sm text-neutral-600 hover:text-black dark:text-neutral-300 transition dark:hover:text-white disabled:dark:hover:text-neutral-300 disabled:hover:text-neutral-600"
            onClick={nextPage}
            disabled={currentPage === totalPages}
          >
            Next →
          </button>
        </div>
        </div>  
      </div>
      <div className="custom-scrollbar flex flex-col gap-[2rem] box-border overflow-hidden overflow-y-scroll p-2">
        <div className="w-full flex flex-wrap gap-5 ">
          {currentItems.map((fragrance) => (
            <FragranceCard
              key={fragrance._id}
              fragranceId={fragrance._id}
              fragranceImage={fragrance.image}
              fragranceName={fragrance.name}
              fragranceBrand={fragrance.brand}
              fragranceType={fragrance.type}
              isFavorite={isFragranceFavorite(fragrance._id)}
              onToggleFavorite={toggleFragranceFavorite}
              onCardClick={() => showFragrancePage(fragrance._id)}
            />
          ))}
        </div>
        <div className="w-full flex justify-center items-center gap-5">
          <button
            className="text-lg text-neutral-600 hover:text-black dark:text-neutral-300 transition dark:hover:text-white disabled:dark:hover:text-neutral-300 disabled:hover:text-neutral-600"
            onClick={prevPage}
            disabled={currentPage === 1}
          >
            ← Prev
          </button>
          <p className="dark:text-white text-lg">{currentPage}</p>
          <button
            className="text-lg text-neutral-600 hover:text-black dark:text-neutral-300 transition dark:hover:text-white disabled:dark:hover:text-neutral-300 disabled:hover:text-neutral-600"
            onClick={nextPage}
            disabled={currentPage === totalPages}
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  );
};

export default FullLibrary;
