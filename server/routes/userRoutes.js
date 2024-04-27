const express = require("express");
const router = express.Router();
const  cors = require("cors")

const { addToFavorites, removeFromFavorites, getFavorites, changeUsername, deleteAccount } = require("../controllers/userController")

// middleware
router.use(
    cors({
        credentials: true,
        origin: "http://localhost:5173"
    })
)

router.post('/addFavorite', addToFavorites);
router.post('/removeFavorite', removeFromFavorites);
router.post('/changeUsername', changeUsername);
router.post('/deleteAccount', deleteAccount)
router.get('/getFavorites', getFavorites);

module.exports = router;