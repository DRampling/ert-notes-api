const router = require("express").Router();
const passport = require("passport");

const { errors, local } = require("../../constants");
const { getDB } = require("../../models");

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const { client, db } = getDB();

  // Check database client is connected
  if (!client || !db) return res.status(500).json(errors[noDatabase]);

  // Check username and password is present
  if (!username) return res.status(400).json(errors[noUsername]);
  if (!password) return res.status(400).json(errors[noPassword]);

  passport.use("login", local);

  // Create token from user id and sign it
});

module.exports = router;
