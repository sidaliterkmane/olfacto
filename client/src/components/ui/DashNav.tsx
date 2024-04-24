import React, { useState } from 'react'

import { IoIosArrowDown } from "react-icons/io";

interface DashNavProps {
    userName: string;
    handleLogout: () => void;
    toggleFullLibrary: () => void;
    toggleDashboard: () => void;
    toggleProfile: () => void;
}

const DashNav: React.FC<DashNavProps> = ({ userName, handleLogout, toggleFullLibrary, toggleDashboard, toggleProfile }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropDown = () => {
        setIsOpen(!isOpen);
    }

    return (
        <div className='z-[500] border dark:border-white border-black border-opacity-15 dark:border-opacity-5 w-full h-[70px] bg-neutral-50 dark:bg-neutral-900 rounded-2xl p-[20px] flex justify-between items-center shadow-lg relative'>
            <div className='relative'>
                <span className='absolute z-30 top-[-7px] right-[-5px]'>✨</span>
                <button className="group group-hover:before:duration-500 group-hover:after:duration-500 after:duration-500 hover:before:[box-shadow:_20px_20px_20px_30px_#a21caf] duration-500 before:duration-500 hover:duration-500 hover:after:-right-8 hover:before:right-12 hover:before:-bottom-8 hover:before:blur origin-left hover:decoration-2 relative bg-neutral-300 h-16 w-64 text-left p-3 text-gray-50 text-base font-bold rounded-lg  overflow-hidden  before:absolute before:w-12 before:h-12 before:content[''] before:right-1 before:top-1 before:z-10 before:bg-violet-500 before:rounded-full before:blur-lg  after:absolute after:z-10 after:w-20 after:h-20 after:content['']  after:bg-rose-300 after:right-8 after:top-3 after:rounded-full after:blur-lg w-[130px] h-[40px] flex justify-center items-center hover:brightness-110 dark:bg-neutral-300 shadow-md">
                    <p className='font-semibold text-sm z-40'>Discover</p>
                </button>
            </div>
            <button className='options-btn flex items-center justify-between w-[100px] bg-neutral-50 p-[8px] rounded-md dark:bg-neutral-700 border border-neutral-300 hover:bg-neutral-100 shadow dark:border-neutral-500 dark:hover:bg-neutral-600' onClick={toggleDropDown} type='button'>
                <p className='font-medium text-sm dark:text-neutral-200'>Options</p>
                <IoIosArrowDown className='text-neutral-400 dark:text-white shrink-0' />
            </button>

            <div
                className={`z-10 shadow-md origin-top-right absolute right-0 mt-[285px] mr-[20px] w-56 rounded-md bg-white border border-neutral-300 dark:border-neutral-500 dark:bg-neutral-600 ring-1 ring-black ring-opacity-5 focus:outline-none transition ease duration-300 ${
                    isOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible translate-y-1'} `}
            >
                
                <div className="py-1 flex flex-col gap-1">
                    <p className='px-4 py-2 text-sm font-light dark:text-white'>Signed in as {userName}</p>
                    <button onClick={toggleProfile}  className="text-gray-700 dark:text-neutral-50 block px-4 py-2 text-sm hover:bg-neutral-100 dark:hover:bg-neutral-500 flex justify-start">My Profile</button>
                    <div className='w-full border-b dark:border-neutral-500'></div>
                    <button onClick={toggleDashboard} className="text-gray-700 dark:text-neutral-50 block px-4 py-2 text-sm hover:bg-neutral-100 dark:hover:bg-neutral-500 flex justify-start">Dashboard</button>
                    <button onClick={toggleFullLibrary} className="text-gray-700 dark:text-neutral-50 block px-4 py-2 text-sm hover:bg-neutral-100 dark:hover:bg-neutral-500 flex justify-start">Fragrance Library</button>
                    
                    <div className='w-full border-b dark:border-neutral-500'></div>
                    <button onClick={handleLogout} className="text-gray-700 dark:text-neutral-50 block px-4 py-2 text-sm hover:bg-neutral-100 dark:hover:bg-neutral-500 flex justify-start">Log out</button>
                </div>
            </div>

        </div>
    )
}

export default DashNav