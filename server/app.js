require("dotenv/config");

require("./db");

const express = require("express");

const app = express();

require("./config")(app);

const allRoutes = require("./routes");
const path = require('path')
app.use(express.static(path.join(__dirname, "public")))
app.use("/api", allRoutes);
app.use((req, res) => res.sendFile(__dirname + "/public/index.html"));

module.exports = app;
