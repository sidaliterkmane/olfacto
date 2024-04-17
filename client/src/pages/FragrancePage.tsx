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
            <div className="w-full mt-[20px] pt-[50px] mb-[130px] pr-5 flex gap-[2rem] justify-between px-[1rem]">
                <div className='w-[60%]  flex flex-col gap-[1rem] justify-between'>
                    <h1 className='text-7xl font-bold dark:text-white'>{fragrance.name}</h1>
                    <p className='font-light dark:text-white text-md '><span className='font-light text-md text-blue-700'>By</span> {fragrance.brand}</p>

                    <p className='box-border p-[5px] rounded-lg w-fit text-xs border-neutral-300 border dark:border-neutral-700 text-neutral-600 dark:text-neutral-500 bg-neutral-200 dark:bg-neutral-800 shadow'>{fragrance.family}</p>

                    <p className='mt-[2rem] text-neutral-500'>
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
                    
                    <div className='flex gap-[1rem] mt-[2rem]'>
                    <button
                        className="w-fit brightness-150 dark:brightness-100 p-[2px] rounded-lg bg-gradient-to-br from-blue-800 via-blue-600 to-blue-800 shadow-md"
                    >
                        <div
                            className="px-6 py-2 backdrop-blur-xl bg-black/80 rounded-md font-semibold w-full h-full hover:brightness-125"
                        >
                            <div
                                className="flex text-blue-600 gap-1"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke-width="1.8"
                                    className="w-6 h-6 stroke-blue-600"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z"
                                    ></path>
                                </svg>
                                Get it now
                            </div>
                        </div>
                    </button>

                    <button className='' onClick={() => onToggleFavorite(fragranceId, isFavorite(fragranceId))}>
                        {heart}
                    </button>
                    </div>
                    


                </div>

                <div className='w-[40%]'>
                    <img className='object-cover w-full h-[700px] rounded-lg' src={fragrance.image} alt={fragrance.name} />
                </div>
            </div>

            <div className='pr-5 border-t border-neutral-300 dark:border-neutral-700 pt-10'>
                {library}
            </div>

        </div>
    )
}

export default FragrancePage