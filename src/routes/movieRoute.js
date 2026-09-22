const express = require("express");
const router = express.Router();
const movieController = require("../controllers/movieController");


router.route("/").get(movieController.getMovie).post(movieController.create);

module.exports = router;