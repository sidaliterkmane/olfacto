import { useState, useEffect } from 'react';
import { getSampleFragrances, getAllFragrances, getUserFavorites } from '../services/fragranceService';

const useFragranceData = (userEmail: string) => {
    const [fragrances, setFragrances] = useState([]);
    const [allFragrances, setAllFragrances] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        if (userEmail) {
            Promise.all([getSampleFragrances(), getAllFragrances(), getUserFavorites(userEmail)])
                .then(([sampleFragrances, allFrags, userFavs]) => {
                    setFragrances(sampleFragrances);
                    setAllFragrances(allFrags);
                    setFavorites(userFavs);
                })
                .catch(error => {
                    console.error("Error: ", error);
                    setError(new Error("An unknown error occured"))
                })
        }
    }, [userEmail])

    const updateFavorites = (fragranceId: string, isFavorite: boolean) => {
        setFavorites((currentFavorites) => {
          if (isFavorite) {
            // Remove the fragrance from favorites
            return currentFavorites.filter(fav => fav._id !== fragranceId);
          } else {
            // Add the fragrance to favorites
            const newFavorite = allFragrances.find(frag => frag._id === fragranceId);
            return newFavorite ? [...currentFavorites, newFavorite] : currentFavorites;
          }
        });
      };

    return { fragrances, allFragrances, favorites, error, updateFavorites };
};

export default useFragranceData;