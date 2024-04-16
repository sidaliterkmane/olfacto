import { useEffect, useState } from 'react';
import axios from 'axios';
import { IoHeart } from "react-icons/io5";

interface FragrancePageProps {
    fragranceId: string;
    library: any;
    isFavorite: (fragranceId: string) => boolean;
    onToggleFavorite: (fragranceId: string, isFavorite: boolean) => void;
}

const FragrancePage: React.FC<FragrancePageProps> = ({ fragranceId, library, onToggleFavorite, isFavorite }) => {
    const [fragrance, setFragrance] = useState(null);

    const heartIconStyle = isFavorite(fragranceId) ? "text-red-500 hover:brightness-90" : 'text-neutral-300 hover:brightness-90 dark:text-neutral-700 dark:hover:brightness-150';

    const heart = <IoHeart className={heartIconStyle} size={"25px"} />

    useEffect(() => {
        const fetchFragranceData = async () => {
            try {
                const response = await axios.get(`/api/fragrances/${fragranceId}`)
                setFragrance(response.data);
            } catch (error) {
                console.error("Error fetching fragrance data", error)
            }
        };

        fetchFragranceData();
    }, [fragranceId])

    if (!fragrance) {
        return <div>Loading...</div>
    }

    return (
        <div className="w-[103%] h-full bg-neutral-200 dark:bg-neutral-950 flex flex-col gap-[1rem] overflow-hidden overflow-y-scroll custom-scrollbar p-1">
            <div className="w-full mt-[20px] pt-[50px] mb-[130px] pr-5 flex gap-[2rem] justify-between ">
                <div className='w-[60%]  flex flex-col gap-[1rem]'>
                    <h1 className='text-7xl font-bold dark:text-white'>{fragrance.name}</h1>
                    <p className='font-light dark:text-white text-md '><span className='font-light text-md text-blue-700'>By</span> {fragrance.brand}</p>

                    <p className='box-border p-[5px] rounded-lg w-fit text-xs border-neutral-300 border dark:border-neutral-700 text-neutral-600 dark:text-neutral-500 bg-neutral-200 dark:bg-neutral-800 shadow'>{fragrance.family}</p>

                    <button className='' onClick={() => onToggleFavorite(fragranceId, isFavorite(fragranceId))}>
                        {heart}
                    </button>

                    <p className='mt-[4rem] text-neutral-500'>
                        {fragrance.description}
                    </p>

                    <div className='mt-10'>
                        <h1 className='text-lg font-normal mb-2 dark:text-neutral-300'>Fragrance Notes <br /></h1>
                        <div className='flex gap-1 flex-wrap'>
                            {fragrance.notes.map((note: string) => {
                                return (
                                    <p className='box-border p-[5px] rounded-lg w-fit text-xs border-neutral-300 border dark:border-neutral-700 text-neutral-600 dark:text-neutral-500 bg-neutral-200 dark:bg-neutral-800 shadow'>{note}</p>
                                )
                            })}
                        </div>
                    </div>


                </div>

                <div className='w-[40%]'>
                    <img className='object-cover w-full h-[600px] rounded-lg' src={fragrance.image} alt={fragrance.name} />
                </div>
            </div>

            <div className='pr-5 border-t border-neutral-300 dark:border-neutral-700 pt-10'>
                {library}
            </div>

        </div>
    )
}

export default FragrancePage