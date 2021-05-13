const { connectToDB, disconnectFromDB, getDB } = require("./connection");
const { findOne } = require("./read");

module.exports = { connectToDB, disconnectFromDB, findOne, getDB };
