// File serves as bridge for repeated API calls

import axios from 'axios';

// returns a 5 fragrance sample (random)
const getSampleFragrances = async () => {
    const response = await axios.get("/api/fragrances/sample");
    return response.data;
}

// returns all fragrances in DB
const getAllFragrances = async () => {
    const response = await axios.get("/api/fragrances");
    return response.data;
}

// returns a user's favorite fragrances
const getUserFavorites = async (userEmail: string) => {
    const response = await axios.get("/user/getFavorites", {params: { userEmail }});
    return response.data;
}

// adds or removes fragrance from user's favorites depending if the fragrance 
// is a favorite or not
const toggleFavorite = async (userEmail: string, fragranceId: string, isFavorite: boolean) => {
    const endpoint = isFavorite ? "/user/removeFavorite" : "/user/addFavorite";
    const response = await axios.post(endpoint, { userEmail, fragranceId });
    return { 
      updatedFavoriteId: fragranceId, 
      isFavorite: !isFavorite, 
      message: response.data.message 
    };
  };

const logoutUser = async () => {
    await axios.get('/logout')
}

export { getSampleFragrances, getAllFragrances, getUserFavorites, toggleFavorite, logoutUser };