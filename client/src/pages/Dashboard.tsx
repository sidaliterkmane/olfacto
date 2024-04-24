import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Library from "../components/FragranceLibrary/Library";
import FullLibrary from "../components/FragranceLibrary/FullLibrary";
import DashNav from "../components/ui/DashNav";
import useFragranceData from '../../hooks/useFragranceData';
import { toggleFavorite, logoutUser } from '../../services/fragranceService';
import FragrancePage from "./FragrancePage";
import UserProfile from "./UserProfile";
import Favorites from "../components/Favorites";

import acquaDiParma from '../assets/acqua-di-parma.png'

import { motion } from "framer-motion";
import { HeroHighlight, Highlight } from "../components/ui/hero-highlight";

const Dashboard = () => {
  // Accessing user context to retrieve and update user information
  const { user, setUser }: any = useContext(UserContext);
  const navigate = useNavigate();


  // State to store list of fragrances, dashboard states and any errors
  const [fragrances, setFragrances] = useState([]);
  const [allFragrances, setAllFragrances] = useState([])
  const [error, setError] = useState<Error | null>(null);
  const [favorites, setFavorites] = useState([]);
  const [currentFragrancePage, setCurrentFragrancePage] = useState('');

  // Updates the current view
  const [view, setView] = useState<"default" | "fullLibrary" | "fragrance" | "profile">("default")

  const switchView = (newView: 'default' | 'fullLibrary' | 'fragrance' | "profile") => {
    setView(newView);
  };

  const showFragrancePage = (fragranceId: string) => {
    setView("fragrance");
    setCurrentFragrancePage(fragranceId)
  }

  const showUserProfile = () => {
    setView("profile");
  }

  // useEffect hook to fetch fragrance data and user's favorites on component mount
  useEffect(() => {
    const fetchFavoritesAndFragrances = async () => {
      if (user?.email) {
        try {
          // Fetch fragrances and update state
          const fragResponse = await axios.get('/api/fragrances/sample');
          setFragrances(fragResponse.data);

          const allFragrancesResponse = await axios.get("/api/fragrances");
          setAllFragrances(allFragrancesResponse.data);

          // Fetch user's favorite fragrances and update the user context
          const favResponse = await axios.get('/user/getFavorites', { params: { userEmail: user.email } });
          setFavorites(favResponse.data);
        } catch (error) {
          console.error("Error: ", error);
          setError(new Error("An unknown error occurred"));
        }
      }
    };

    fetchFavoritesAndFragrances();
  }, [user?.email]);

  if (!user) {
    navigate("/login");
    return null;
  }

  // Function to check if a specific fragrance is marked as a favorite by the user
  const isFragranceFavorite = (fragranceId: string) => {
    return favorites.some((fav: { _id: string }) => fav._id === fragranceId);
  };

  // Function to handle adding/removing a fragrance from favorites
  const toggleFragranceFavorite = async (fragranceId: string, isFavorite: boolean) => {
    const endpoint = isFavorite ? "/user/removeFavorite" : "/user/addFavorite";

    try {
      const response = await axios.post(endpoint, { userEmail: user.email, fragranceId });
      toast.success(response.data.message);

      if (isFavorite) {
        const updatedFavorites = favorites.filter((fav: { _id: string }) => fav._id !== fragranceId);
        setFavorites(updatedFavorites);
      } else {
        const newFavorite = allFragrances.find((frag) => frag._id === fragranceId);
        if (newFavorite) {
          setFavorites([...favorites, newFavorite]);
        }
      }
    } catch (error) {
      toast.error("Failed to update favorites.");
      console.error("Error updating favorites: ", error);
    }
  };

  const handleLogout = async () => {
    try {
      await axios.get("/logout");
      setUser(null);
      toast.success("You have successfully logged out.");
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const cardStyle = {
    backgroundImage: `linear-gradient(to top left, rgba(15,15,15,0), rgba(15,15,15, 0.75), rgba(15,15,15,1) 65%), url(${acquaDiParma})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center'
}

  const DefaultDashboard = () => {
    return (
      <div className="w-[103%] overflow-hidden overflow-y-scroll custom-scrollbar flex flex-col gap-[3rem]">
        <div className="w-full flex flex-col gap-[1.5rem] pr-6">
          <h1 className="text-3xl font-semibold dark:text-white">Dashboard</h1>
          <div className="greetings flex w-full h-[300px] border dark:border-white border-black border-opacity-5 dark:border-opacity-10 rounded-lg shadow">
            <div className="w-full h-full">
              <HeroHighlight>
                <h1 className="text-black dark:text-white font-normal text-3xl">Hello, {user.name}. Welcome to Olfacto.</h1>
                <motion.h1
                  initial={{
                    opacity: 0,
                    y: 20,
                  }}
                  animate={{
                    opacity: 1,
                    y: [20, -5, 0],
                  }}
                  transition={{
                    duration: 0.5,
                    ease: [0.4, 0.0, 0.2, 1],
                  }}
                  className="text-md md:text-4xl lg:text-4xl font-bold text-neutral-700 dark:text-neutral-400 max-w-4xl leading-relaxed lg:leading-snug w-[85%] p-0"
                >
                  <p className="text-lg font-normal w-[80%]">Start your fragrance journey with a quick assessment of your current preferences, mood, and personality, <Highlight className="text-black dark:text-white">and let our algorithm handle the rest</Highlight>.</p>

                </motion.h1>
                <div className='relative w-fit'>
                  <span className='absolute z-30 top-[-7px] right-[-5px]'>✨</span>
                  <button className="w-fit group group-hover:before:duration-500 group-hover:after:duration-500 after:duration-500 hover:before:[box-shadow:_20px_20px_20px_30px_#a21caf] duration-500 before:duration-500 hover:duration-500 hover:after:-right-8 hover:before:right-12 hover:before:-bottom-8 hover:before:blur origin-left hover:decoration-2 relative bg-neutral-300 h-16 w-64 text-left p-3 text-gray-50 text-base font-bold rounded-lg  overflow-hidden  before:absolute before:w-12 before:h-12 before:content[''] before:right-1 before:top-1 before:z-10 before:bg-violet-500 before:rounded-full before:blur-lg  after:absolute after:z-10 after:w-20 after:h-20 after:content['']  after:bg-rose-300 after:right-8 after:top-3 after:rounded-full after:blur-lg w-[130px] h-[40px] flex justify-center items-center hover:brightness-110 dark:bg-neutral-300 shadow-md">
                    <p className='font-semibold text-sm z-40'>Start assessment</p>
                  </button>
                </div>
              </HeroHighlight>
            </div>
          </div>

          <div className="favs pt-8">
             <div>
                  <Favorites 
                    favoriteFragrances={favorites}
                    showFragrancePage={showFragrancePage}
                  />
             </div>
          </div>
        </div>
        <div className="pr-5">
          <div className='w-[99%] border-t border-neutral-300 dark:border-neutral-700 pt-8'></div>
          <Library fragrances={fragrances} toggleFragranceFavorite={toggleFragranceFavorite} isFragranceFavorite={isFragranceFavorite} toggleFullLibrary={() => switchView('fullLibrary')} showFragrancePage={showFragrancePage} />
        </div>
      </div>
    )
  }

  return (
    <div className="w-full h-full bg-neutral-200 dark:bg-neutral-950 flex justify-center">
      <div className="dashboard-container w-[1250px] mt-[20px] pt-[50px] mb-[50px] p-5 flex flex-col gap-[2rem]">
        <DashNav userName={user.email} handleLogout={handleLogout} toggleProfile={() => switchView('profile')} toggleFullLibrary={() => switchView('fullLibrary')} toggleDashboard={() => switchView('default')} />

        {/* Conditional rendering based on 'view' state */}
        {view === 'default' && <DefaultDashboard />}
        {view === 'fullLibrary' && <FullLibrary toggleFragranceFavorite={toggleFragranceFavorite} fragrances={allFragrances} isFragranceFavorite={isFragranceFavorite} showFragrancePage={showFragrancePage} />}
        {view === 'fragrance' && <FragrancePage fragranceId={currentFragrancePage} library={<Library fragrances={fragrances} toggleFragranceFavorite={toggleFragranceFavorite} isFragranceFavorite={isFragranceFavorite} toggleFullLibrary={() => switchView('fullLibrary')} showFragrancePage={showFragrancePage} />} onToggleFavorite={toggleFragranceFavorite} isFavorite={isFragranceFavorite} />}
        {view === 'profile' && <UserProfile user={user}/>}
      </div>
    </div>
  );
};



export default Dashboard;
