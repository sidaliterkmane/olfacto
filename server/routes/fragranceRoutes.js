const express = require("express");
const router = express.Router();
const  cors = require("cors")

const { getAllFragrances } = require("../controllers/fragranceController")

// middleware
router.use(
    cors({
        credentials: true,
        origin: "http://localhost:5173"
    })
)

router.get('/fragrances', getAllFragrances);

module.exports = router;