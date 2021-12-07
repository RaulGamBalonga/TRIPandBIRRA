const router = require("express").Router();
const authRoutes = require("./auth");
const reviewRoutes = require("./review.routes")
const barRoutes = require("./bar.routes");


/* GET home page */
router.get("/", (req, res, next) => {
  res.json("All good in here");
});

router.use("/auth", authRoutes);
router.use("/review", reviewRoutes)
router.use("/bar", barRoutes);

module.exports = router;
