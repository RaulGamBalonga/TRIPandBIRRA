const router = require("express").Router();
const authRoutes = require("./auth");
const barRoutes = require("./bar.routes");


/* GET home page */
router.get("/", (req, res, next) => {
  res.json("All good in here");
});

router.use("/auth", authRoutes);
router.use("/bar", barRoutes);

module.exports = router;
