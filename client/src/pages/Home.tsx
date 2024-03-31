import { motion } from "framer-motion";
import React from "react";
import { AuroraBackground } from "../components/ui/aurora-background";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
    <AuroraBackground>
      <motion.div
        initial={{ opacity: 0.0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="max-w-[1250px] relative flex flex-col gap-4 items-center justify-center px-4"
      >
        <div className="text-3xl md:text-7xl font-bold dark:text-white text-center">
          Never wear a fragrance you don't like, ever again.
        </div>
        <div className="font-extralight text-base md:text-3xl dark:text-neutral-200 py-4 text-center">
        Truly smell like you want, feel and desire <br /> with personalized scent recommendations.
        </div>
        <Link className="bg-black dark:bg-white rounded-full w-fit text-white dark:text-black px-4 py-2" to={"/register"}>
          Get started now
        </Link>

        <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
          Already have an account? Please <span className="font-bold"><Link to={"/login"} >login</Link></span>.
        </p>
      </motion.div>
    </AuroraBackground>
    </div>
  )
}

export default Home