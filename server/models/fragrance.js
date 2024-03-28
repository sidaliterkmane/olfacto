const mongoose = require("mongoose")
const { Schema } = mongoose

const fragranceSchema = new Schema({
    name: String,
    brand: String,
    type: String,
    for: String,
    notes: [String],
    family: String,
    description: String,
    image: String, // URLs
});

const Fragrance = mongoose.model('Fragrance', fragranceSchema);

module.exports = Fragrance;

