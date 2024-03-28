// This script simply imports data to the DB from a json file according 
// to object schema structure

const mongoose = require('mongoose');
const Fragrance = require("../models/fragrance");
const data = require("../data/fragrances.json");

require('dotenv').config({ path: 'server/.env'});

console.log("MongoDB URI: ", process.env.MONGO_URL);

// database connection
mongoose.connect(process.env.MONGO_URL)
.then(() => console.log("DB Connected."))
.catch((err) => console.log("DB Failed To Connect", err))

async function importData() {
    for (const fragrance of data) {
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