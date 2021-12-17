const express = require("express");

const logger = require("morgan");

const cookieParser = require("cookie-parser");

const cors = require("cors");

const session = require("express-session");

const MongoStore = require("connect-mongo");

const MONGO_URI = process.env.MONGODB_URI || "mongodb://localhost/server";

module.exports = (app) => {
  app.set("trust proxy", 1);

  app.use(
    cors({
      credentials: true,
      origin: process.env.ORIGIN || "http://localhost:3000",
    })
  );


  app.use(
    session({
      secret: process.env.SESS_SECRET,
      resave: true,
      saveUninitialized: false,
      cookie: {
        // sameSite: ‘none’,
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24,
      },
      store: MongoStore.create({
        mongoUrl: process.env.MONGODB_URI || 'mongodb://localhost/api/auth',
      }),
    })
  );

  app.use(logger("dev"));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());

};
