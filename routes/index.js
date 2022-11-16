const express = require("express");
const router = express.Router();
const predictionRoute = require("./predictions");

router.use("/predi", predictionRoute);

module.exports = router;
