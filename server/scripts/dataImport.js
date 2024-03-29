// This script simply imports data to the DB from a json file according 
// to object schema structure

const mongoose = require('mongoose');
const Fragrance = require("../models/fragrance");
const data = require("../data/fragrances.json");

require('dotenv').config({ path: 'server/.env'});

// database connection
mongoose.connect(process.env.MONGO_URL)
.then(() => console.log("DB Connected."))
.catch((err) => console.log("DB Failed To Connect", err))

// Function parsing json file and adding objects into DB to match the schema.
// In this case the schema is fragrance.js
const importData = async () => {
    for (const fragrance of data) {
        // Checks if item exists in DB
        try {
            const exists = await Fragrance.findOne({ name: fragrance.name }).exec();

            if (!exists) {
                await Fragrance.create(fragrance);
                console.log("Added new fragrance: " + fragrance.name);
            } else {
                console.log("Fragrance already exists: " + fragrance.name)
            }
        } catch (error) {
            console.log("Error importing fragrance " + fragrance.name + " " + error)
        }
    }
    mongoose.disconnect();
}

importData();