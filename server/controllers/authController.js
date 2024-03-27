const User = require("../models/user");
const { hashPassword, comparePasswords } = require("../helpers/auth");
const jwt = require("jsonwebtoken");

const test = (req, res) => {
    res.json("test is working");
}

// Register Endpoint
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

        const hashedPassword = await hashPassword(password)

        // Create user in DB
        const user = await User.create({
            name, 
            email, 
            password: hashedPassword,
        })

        return res.json(user)
    } catch (error) {
        console.log(error);
    }
}

// Login Endpoint
const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body;

        // Check if user exists
        const user = await User.findOne({email})
        if (!user) {
            return res.json({
                error: "No user was found under this email."
            })
        }

        // Check if passwords match
        const match = await comparePasswords(password, user.password)
        if (match) {
            jwt.sign({email: user.email, id: user._id, name: user.name}, process.env.JWT_SECRET, {}, (err, token) => {
                if (err) throw err;
                res.cookie("token", token).json(user)
            })
        } else {
            res.json({
                error : "Incorrect password. Please try again."
            })
        }
    } catch (error) {
        console.log(error)
    }
}

const getProfile = (req, res) => {
    const {token} = req.cookies

    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
            if (err) throw err;
            res.json(user)
        })
    } else {
        res.json(null)
    }
}

module.exports = {
    test,
    registerUser,
    loginUser,
    getProfile
}