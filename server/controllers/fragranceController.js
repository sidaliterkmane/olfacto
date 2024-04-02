const Fragrance = require('../models/fragrance');

// Retrieves all available fragrances from the database
const getAllFragrances = async (req, res) => {
    try {
        // Fetch all fragrances from the DB
        const fragrances = await Fragrance.find({});
        res.json(fragrances)
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Retrieves a random sample of fragrances from the database
const getFragrancesSample = async (req, res) => {
    try {
        // Randomly select 5 fragrances from the DB
        const fragrancesSample = await Fragrance.aggregate([
            {$sample: {size: 5}}
        ])
        res.json(fragrancesSample)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

module.exports = {
    getAllFragrances,
    getFragrancesSample
}