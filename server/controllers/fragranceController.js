const Fragrance = require('../models/fragrance');

const getAllFragrances = async (req, res) => {
    try {
        const fragrances = await Fragrance.find({});
        res.json(fragrances)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    getAllFragrances
}