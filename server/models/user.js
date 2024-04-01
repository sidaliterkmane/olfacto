const mongoose = require('mongoose')
const { Schema } = mongoose

const userSchema = new Schema({
    name: String,
    email: {
        type: String,
        unique: true
    },
    password: String,
    favorites: [{
        type: Schema.Types.ObjectId,
        ref: 'Fragrance'
    }]
})

const UserModel = mongoose.model("User", userSchema)

module.exports = UserModel