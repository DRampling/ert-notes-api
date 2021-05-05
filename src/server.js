require("dotenv").config();
const cors = require("cors");
const express = require("express");
const morgan = require("morgan");

const { debug } = require("./helpers/debug");
// const routes = require("./api/1.0/routes");
const { connectToDB } = require("./api/1.0/models/connection");

// Setup server
const app = express();
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// Setup database connection
connectToDB(app).catch(console.error);

// Setup routes and start server
app.on("Database connected", () => {
  // app.use(routes);

  const server = app.listen(3000, () => {
    const port = server.address().port;
    debug(`Server started on port ${port}`);
  });
});

module.exports = { app };
