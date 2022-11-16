const express = require("express");
const router = express.Router();
const { generatePrediction } = require("../controllers/predictions");

router.post("/", generatePrediction);

module.exports = router;
