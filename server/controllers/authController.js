const User = require("../models/user")

const test = (req, res) => {
    res.json("test is working");
}

const registerUser = async (req, res) => {
    try {
        const {name, email, password} = req.body;
        // Check if name was entered
        if (!name || name.length < 4) {
            return res.json({
                error: "Name is required and must be at least 4 characters long."
            })
        }

        let hasNumber = false;
        let hasUpperCase = false;

        // Loop through password to check for number and uppercase
        if (password) {
            for(let i = 0; i < password.length; i++) {
                const char = password[i];
                if(!isNaN(char * 1)) hasNumber = true;
                if (char === char.toUpperCase() && isNaN(char * 1)) hasUpperCase = true;
            }
        }

        // Check if password is good
        if (!password || password.length < 6 || !hasNumber || !hasUpperCase) {
            return res.json({
                error: "Password is required and must be at least 6 characters long and must contain at least one uppercase letter and one number."
            })
        };

        // Check email
        const exist = await User.findOne({email})

        if (exist) {
            return res.json({
                error: "Email already exists."
            })
        }

        const user = await User.create({
            name, email, password
        })

        return res.json(user)
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    test,
    registerUser
}