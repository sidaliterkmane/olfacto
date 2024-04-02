import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'

import FragranceCard from './FragranceCard'
import { UserContext } from '../../../context/UserContext'

interface LibraryProps {
  fragrances: any[];
  toggleFragranceFavorite: (fragranceId: string, isFavorite: boolean) => void;
  isFragranceFavorite: (fragranceId: string) => boolean;
  toggleFullLibrary: () => void;
}

// The Library component displays a small sample of fragrance cards
const Library: React.FC<LibraryProps> = ({fragrances, toggleFragranceFavorite, isFragranceFavorite, toggleFullLibrary}) => {

  return (
    <div className='flex flex-col gap-[2rem] box-border'>
      <div className='w-full flex items-center justify-between'>
        <h1 className='text-2xl font-semibold dark:text-white'>Fragrance Library</h1>

      </div>
      <div className='w-full flex flex-wrap gap-5'>
        {fragrances.map(fragrance => (
          <FragranceCard
            key={fragrance._id}
            fragranceId={fragrance._id}
            fragranceImage={fragrance.image}
            fragranceName={fragrance.name}
            fragranceBrand={fragrance.brand}
            fragranceType={fragrance.type}
            isFavorite={isFragranceFavorite(fragrance._id)}
            onToggleFavorite={toggleFragranceFavorite}
          />
        ))}
      </div>
      <div className='w-full flex items-center justify-end'>
        <button onClick={toggleFullLibrary} className='text-lg text-neutral-600 hover:text-black dark:text-neutral-300 transition dark:hover:text-white'>See all →</button>
      </div>
    </div>

  )
}

export default Library