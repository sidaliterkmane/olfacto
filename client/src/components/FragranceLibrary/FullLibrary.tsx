import React, { useState } from 'react'
import FragranceCard from './FragranceCard';

import { IoSearch } from "react-icons/io5";

interface FullLibraryProps {
    fragrances: any[];
    toggleFragranceFavorite: (fragranceId: string, isFavorite: boolean) => void;
    isFragranceFavorite: (fragranceId: string) => boolean;
    showFragrancePage: (fragranceId: string) => void;
}



const FullLibrary: React.FC<FullLibraryProps> = ({ fragrances, toggleFragranceFavorite, isFragranceFavorite, showFragrancePage }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredFragrances = fragrances.filter(fragrance => {
        return fragrance.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            fragrance.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
            fragrance.type.toLowerCase().includes(searchTerm.toLowerCase());
    });

    return (
        <div className='flex flex-col gap-[2rem] box-border h-[90%] w-[103%]'>
            <div className='w-full flex items-center justify-between'>
                <h1 className='text-2xl font-semibold dark:text-white'>Fragrance Library</h1>

                <div className='filters mr-[35px] flex gap-[1rem]'>
                    <div className='flex items-center gap-2'>
                        <IoSearch className='text-neutral-500' size={'20px'}/>
                        <input
                            type="text"
                            placeholder="Search fragrances..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className='bg-zinc-100 dark:bg-neutral-700 text-zinc-600 ring-1 ring-zinc-300 outline-none duration-300 placeholder:text-zinc-600 placeholder:opacity-50 placeholder:font-light rounded-md px-4 py-1 shadow focus:shadow-lg focus:bg-neutral-50 dark:ring-zinc-500 dark:placeholder:text-neutral-300 dark:text-neutral-200 dark:focus:bg-neutral-600'
                        />
                    </div>

                </div>

            </div>
            <div className='custom-scrollbar flex flex-col gap-[2rem] box-border overflow-hidden overflow-y-scroll p-2'>

                <div className='w-full flex flex-wrap gap-5 '>
                    {filteredFragrances.map(fragrance => (
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
            </div>
        </div>

    )
}

export default FullLibrary