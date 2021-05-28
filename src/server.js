require("dotenv").config();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const express = require("express");
const morgan = require("morgan");
const passport = require("passport");

const routes = require("./api/1.0/routes");
const { connectToDB, jwt } = require("./api/1.0");
const { debug } = require("./helpers/debug");

// Setup database connection
const app = express();
connectToDB(app).catch(console.error);

app.on("Database connected", () => {
  // Setup server
  jwt(passport);
  app.use(passport.initialize());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors({ origin: true, credentials: true }));
  app.use(cookieParser(process.env.COOKIE_SECRET));
  app.use(morgan("dev"));
  app.use(express.json());

  // Setup routes
  app.use(routes);

  const server = app.listen(3001, () => {
    const port = server.address().port;
    debug(`Server started on port ${port}`);
  });
});

module.exports = { app };
