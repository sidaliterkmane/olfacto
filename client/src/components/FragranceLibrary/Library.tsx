import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'

import FragranceCard from './FragranceCard'
import { UserContext } from '../../../context/UserContext'

// The Library component displays a small sample of fragrance cards
const Library = () => {
  // Accessing user context to retrieve and update user information
  const { user, setUser }: any = useContext(UserContext)

  // State to store the list of fragrances and any errors
  const [fragrances, setFragrances] = useState([]);
  const [error, setError] = useState<Error | null>(null);

  // Extract the user's email for use in API calls
  const userEmail = user.email;

  // useEffect hook to fetch fragrance data and user's favorites on component mount
  useEffect(() => {
    const fetchFavoritesAndFragrances = async () => {
      try {
        // Fetch fragrances and update state
        const fragResponse = await axios.get('/api/fragrances/sample');
        setFragrances(fragResponse.data);

        // Fetch user's favorites fragrances and update the user context
        const favResponse = await axios.get('/user/getFavorites', { params: { userEmail: user.email } });
        setUser({ ...user, favorites: favResponse.data });
      } catch (error) {
        // Handle any errors during the fetch process
        console.error("Error: ", error);
        setError(new Error("An unknown error occurred"));
      }
    };

    fetchFavoritesAndFragrances();
  }, [user.email, setUser]);

  // Function to check if a specific fragrance is marked as a favorite by the user
  const isFragranceFavorite = (fragranceId: string) => {
    const isFavorite = user && Array.isArray(user.favorites) && user.favorites.some((fav: { _id: string }) => fav._id === fragranceId);
    // console.log(`Fragrance ${fragranceId} is favorite: ${isFavorite}`);
    return isFavorite;
  }

  // Function to handle adding/removing a fragrance from favorites
  const toggleFragranceFavorite = (fragranceId: string, isFavorite: boolean) => {
    // console.log("toggleFragranceFavorite called with:", { userEmail, fragranceId, isFavorite }); // Log data being sent
    const endpoint = isFavorite ? "/user/removeFavorite" : "/user/addFavorite"

    axios.post(endpoint, { userEmail, fragranceId })
    .then(response => {
      toast.success(response.data.message);
  
      // Initialize favorites as an array if undefined and update user's favorites
      let currentFavorites = Array.isArray(user.favorites) ? user.favorites : [];
  
      if (isFavorite) {
        // Removing the fragrance from favorites if it is currently a favorite
        const updatedFavorites = user.favorites.filter((fav: { _id: string }) => fav._id !== fragranceId);
        setUser({ ...user, favorites: updatedFavorites });
      } else {
        // Add the fragrance to favorites if it is not currently a favorite
        const newFavorite = fragrances.find((frag) => frag._id === fragranceId);
        if (newFavorite) {
          const updatedFavorites = [...currentFavorites, newFavorite];
          setUser({ ...user, favorites: updatedFavorites });
        }
      }
    })
      .catch(error => {
        // Handle any errors while updating the favorites
        toast.error("Failed to update favorites.");
        console.error("Error updating favorites: ", error)
      })
  }

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
        <a href="/library" className='text-lg text-neutral-600 hover:text-black dark:text-neutral-300 transition dark:hover:text-white'>See all →</a>
      </div>
    </div>

  )
}

export default Library