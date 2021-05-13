const router = require("express").Router();
const passport = require("passport");

const { errors, local } = require("../../constants");
const { getDB, findOne } = require("../../models");

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const { client, db } = getDB();

  // Check database client is connected
  if (!client || !db) return res.status(500).json(errors[noDatabase]);

  // Check username and password is present
  if (!username) return res.status(400).json(errors[noUsername]);
  if (!password) return res.status(400).json(errors[noPassword]);

  // Check account exists
  const account = await findOne(client, "accounts", "username", username);
  if (!account) res.status(401).json(errors[noAccount]);

  // Validate password
  const isValid = utils.validPassword(req.body.password, user.hash, user.salt);

  // Create token from user id and sign it
});

module.exports = router;
