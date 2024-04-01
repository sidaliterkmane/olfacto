const Fragrance = require("../models/fragrance");
const UserModel = require("../models/user");

const addToFavorites = async (req, res) => {
    // console.log("Request to add favorite:", req.body);
    try {
        const { userEmail, fragranceId } = req.body;

        const user = await UserModel.findOne({ email: userEmail })
        if (!user) {
            return res.status(404).json({ error: "User not found "});
        }

        const fragrance = await Fragrance.findById(fragranceId);
        if (!fragrance) {
            return res.status(404).json({ error: "Fragrance not found" });
        }

        if (!user.favorites.includes(fragranceId)) {
            user.favorites.push(fragranceId);
            await user.save();
            return res.json({ message: "Fragrance added to favorites" })
        }

        res.status(400).json({ message: "Fragrance already in favorites."})
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
};

const removeFromFavorites = async (req, res) => {
    // console.log("Request to remove favorite:", req.body);
    try {
        const { userEmail, fragranceId } = req.body;

        const user = await UserModel.findOne({ email: userEmail });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const index = user.favorites.indexOf(fragranceId);
        if (index > -1) {
            user.favorites.splice(index, 1);
            await user.save();
            return res.json({ message: "Fragrance removed from favorites."})
        }

        res.status(400).json({ message: "Fragrance not found in favorites" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
}

const getFavorites = async (req, res) => {
    const userEmail = req.query.userEmail;

    try {
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
    getFavorites
}