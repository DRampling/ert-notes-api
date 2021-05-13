const router = require("express").Router();

const { errors } = require("../../constants");
const { getDB, findOne } = require("../../models");
const { validPassword, createJWT } = require("../../../../helpers");

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
  if (!account) return res.status(401).json(errors[noAccount]);

  // Check password is valid
  const isValid = validPassword(password, account.hash, account.salt);
  if (!isValid) return res.status(401).json(errors[invalidPassword]);

  // Create token and sign it
  const token = createJWT(account);
  return res
    .status(200)
    .json({ state: "login successful", data: { token, code: "200" } });
});

module.exports = router;
