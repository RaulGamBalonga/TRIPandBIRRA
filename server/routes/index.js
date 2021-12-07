const router = require("express").Router();
const authRoutes = require("./auth");
const reviewRoutes = require("./review.routes")

/* GET home page */
router.get("/", (req, res, next) => {
  res.json("All good in here");
});

router.use("/auth", authRoutes);
router.use("/review", reviewRoutes)

module.exports = router;
