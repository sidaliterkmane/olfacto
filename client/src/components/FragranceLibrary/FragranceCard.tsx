import React, { useState } from 'react'
import { IoHeart } from "react-icons/io5";

interface FragranceCardProps {
  fragranceId: string;
  fragranceName: string;
  fragranceBrand: string;
  fragranceImage: string;
  fragranceType: string;
  isFavorite: boolean;
  onToggleFavorite: (fragranceId: string, isFavorite: boolean) => void;
}

const FragranceCard: React.FC<FragranceCardProps> = ({ fragranceName, fragranceBrand, fragranceImage, fragranceType, isFavorite, onToggleFavorite, fragranceId}) => {


  const heartIconStyle = isFavorite ? "text-red-500 hover:brightness-90" : 'text-neutral-200 hover:brightness-90 dark:text-neutral-700 dark:hover:brightness-150';

  const heart = <IoHeart className={heartIconStyle} size={"25px"} />

  return (
    <div className='card w-[225px] h-[380px] bg-neutral-50 hover:brightness-95 dark:bg-neutral-800 shadow hover:shadow-lg rounded-lg overflow-hidden p-[10px] flex flex-col gap-2 transition cursor-pointer hover:translate-y-[-5px]'>
      <div className="img-container h-[70%] w-full">
        <img className="object-cover w-full h-full rounded" src={fragranceImage} alt={fragranceName} />
      </div>
      <div className='fragrance-info flex flex-col mt-1'>

        <p className='font-semibold dark:text-white'>{fragranceName}</p>
        <p className='font-semibold dark:text-white text-xs font-light'><span className='font-light text-xs text-blue-700'>By</span> {fragranceBrand}</p>
        <div className='w-full flex items-center justify-between mt-[1.5rem]'>
          <p className='box-border p-[5px] rounded-lg w-fit text-xs border-neutral-300 border dark:border-neutral-500 text-neutral-600 dark:text-neutral-400 bg-neutral-200 dark:bg-neutral-600 shadow'>{fragranceType}</p>

          <button className='flex justify-center items-center' onClick={() => onToggleFavorite(fragranceId, isFavorite)}>
            {heart}
          </button>
        </div>

      </div>
    </div>
  )
}

export default FragranceCard