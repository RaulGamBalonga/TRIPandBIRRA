const router = require("express").Router();
const authRoutes = require("./auth.routes");
const reviewRoutes = require("./review.routes")
const barRoutes = require("./bar.routes");
const userRoutes = require('./user.routes')


router.get("/", (req, res, next) => {
  res.json("All good in here");
});

router.use("/auth", authRoutes);
router.use("/review", reviewRoutes)
router.use("/bar", barRoutes);
router.use('/user', userRoutes)

module.exports = router;
