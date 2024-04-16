import { IoHeart, IoLogoGithub } from "react-icons/io5";


const Footer = () => {
    const year = new Date().getFullYear().toString()

    return (
        <footer className='absolute bottom-0 z-10 w-full h-[40px] flex justify-center bg-neutral-100 dark:bg-neutral-900'>
            <div className="w-[1250px] flex items-center px-5 justify-between">
                <p className="font-light text-xs text-neutral-500">
                    Copyright © {year} olfacto. All rights reserved. Made with <span className="inline-flex items-center"><IoHeart className=" text-red-400"/></span> by <a href="https://sidaliterkmane.com/" target="_blank" className="text-black dark:text-white">Sid Ali Terkmane</a>.
                </p>
                <a href="https://github.com/sidaliterkmane/olfacto/tree/main" target="_blank">
                    <IoLogoGithub size={"20px"} className="text-neutral-600 transition hover:text-neutral-700 dark:text-neutral-500 dark:hover:text-neutral-200"/>
                </a>
            </div>
        </footer>
    )
}

export default Footer