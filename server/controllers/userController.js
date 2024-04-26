const Fragrance = require("../models/fragrance");
const UserModel = require("../models/user");

// Changes the user's username
const changeUsername = async (req, res) => {
    try {
        const { newUsername, userEmail } = req.body;

        // Find the user by email
        const user = await UserModel.findOne({ email: userEmail })

        if (!user) {
            return res.status(404).json({ error: "User not found"})
        }

        user.name = newUsername; 
        await user.save();
        return res.json({ message: "Username changed successfully. You now have to log back in." })

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
}

// Adds a fragrance to a user's list of favorites
const addToFavorites = async (req, res) => {
    // console.log("Request to add favorite:", req.body);
    try {
        const { userEmail, fragranceId } = req.body;

        // Find the user by email
        const user = await UserModel.findOne({ email: userEmail })
        if (!user) {
            return res.status(404).json({ error: "User not found " });
        }

        // Check if the fragrance exists
        const fragrance = await Fragrance.findById(fragranceId);
        if (!fragrance) {
            return res.status(404).json({ error: "Fragrance not found" });
        }

        // Prevent adding a duplicate favorite
        if (!user.favorites.includes(fragranceId)) {
            user.favorites.push(fragranceId);
            await user.save();
            return res.json({ message: "Fragrance added to favorites" })
        }

        res.status(400).json({ message: "Fragrance already in favorites." })
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};

// Removes a fragrance from a user's favorites
const removeFromFavorites = async (req, res) => {
    // console.log("Request to remove favorite:", req.body);
    try {
        const { userEmail, fragranceId } = req.body;

        const user = await UserModel.findOne({ email: userEmail });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Remove the fragrance from favorites if it exists.
        const index = user.favorites.indexOf(fragranceId);
        if (index > -1) {
            user.favorites.splice(index, 1);
            await user.save();
            return res.json({ message: "Fragrance removed from favorites." })
        }

        res.status(400).json({ message: "Fragrance not found in favorites" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
}

// Retrieves the list of a user's favorite fragrances
const getFavorites = async (req, res) => {
    const userEmail = req.query.userEmail;

    try {
        // Find the user and populate the favorites field with corresponding fragrance data
        const user = await UserModel.findOne({ email: userEmail }).populate("favorites")
        if (!user) {
            return res.status(404).json({ message: "User not found." })
        }

        res.json(user.favorites);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" })
    }
}


module.exports = {
    addToFavorites,
    removeFromFavorites,
    getFavorites,
    changeUsername
}