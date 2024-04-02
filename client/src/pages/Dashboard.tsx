import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Library from "../components/FragranceLibrary/Library";
import FullLibrary from "../components/FragranceLibrary/FullLibrary";
import DashNav from "../components/ui/DashNav";

const Dashboard = () => {
  // Accessing user context to retrieve and update user information
  const { user, setUser }: any = useContext(UserContext);
  const navigate = useNavigate();

  // State to store list of fragrances, dashboard states and any errors
  const [fragrances, setFragrances] = useState([]);
  const [allFragrances, setAllFragrances] = useState([])
  const [error, setError] = useState<Error | null>(null);
  const [favorites, setFavorites] = useState([]);
  const [fragranceLibrary, setFragranceLibrary] = useState(false);

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

  const toggleFullLibrary = () => {
    setFragranceLibrary(true);
  }

  const toggleDashboard = () => {
    setFragranceLibrary(false);
  }

  const DefaultDashboard = () => {
    return (
      <div>
        <Library fragrances={fragrances} toggleFragranceFavorite={toggleFragranceFavorite} isFragranceFavorite={isFragranceFavorite} toggleFullLibrary={toggleFullLibrary} />
      </div>
    )
  }

  return (
    <div className="w-full h-full pb-[130px] bg-neutral-200 dark:bg-neutral-900 flex justify-center">
      <div className="dashboard-container w-[1250px] mt-[20px] pt-[50px] p-5 flex flex-col gap-[2rem]">
        <DashNav userName={user.email} handleLogout={handleLogout} toggleFullLibrary={toggleFullLibrary} toggleDashboard={toggleDashboard}/>
        {
          fragranceLibrary ? <FullLibrary toggleFragranceFavorite={toggleFragranceFavorite} fragrances={allFragrances} isFragranceFavorite={isFragranceFavorite} /> : <DefaultDashboard />
        }
      </div>
    </div>
  );
};



export default Dashboard;
