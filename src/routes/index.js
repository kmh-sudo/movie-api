const router = require("express").Router();
const movieRoute = require("./movieRoute");

router.use("/movie", movieRoute);

module.exports = router;