const express = require("express");
const router = express.Router();
const  cors = require("cors")

const { getAllFragrances, getFragrancesSample, getIndividualFragrance } = require("../controllers/fragranceController")

// middleware
router.use(
    cors({
        credentials: true,
        origin: "http://localhost:5173"
    })
)

router.get('/fragrances', getAllFragrances);
router.get('/fragrances/sample', getFragrancesSample)
router.get('/fragrances/:fragranceId', getIndividualFragrance)

module.exports = router;