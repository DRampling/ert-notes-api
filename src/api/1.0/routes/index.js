const router = require("express").Router();

const apiVersion = `/api/${process.env.API_VERSION}`;

router.use(`${apiVersion}/auth`, require("./auth"));

module.exports = router;
