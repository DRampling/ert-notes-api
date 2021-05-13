require("dotenv").config();
const cors = require("cors");
const express = require("express");
const morgan = require("morgan");
const passport = require("passport");

const { debug } = require("./helpers/debug");
const routes = require("./api/1.0/routes");
const { connectToDB, jwt } = require("./api/1.0");

// Setup server
const app = express();
jwt(passport);
app.use(passport.initialize());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// Setup database connection
connectToDB(app).catch(console.error);

// Setup routes and start server
app.on("Database connected", () => {
  app.use(routes);

  const server = app.listen(3000, () => {
    const port = server.address().port;
    debug(`Server started on port ${port}`);
  });
});

module.exports = { app };
