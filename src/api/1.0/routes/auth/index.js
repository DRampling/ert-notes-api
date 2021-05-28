const router = require("express").Router();
// const passport = require("passport");

const { errors } = require("../../constants");
const { getDB, findOne } = require("../../models");
const { validPassword, createJWT } = require("../../../../helpers");

// Protect routes with passport.authenticate("jwt", { session: false }),

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const { client, db } = getDB();

  // Check database client is connected
  if (!client || !db) return res.status(500).json(errors["noDatabase"]);

  // Check username and password is present
  if (!username) return res.status(400).json(errors["noUsername"]);
  if (typeof username !== "string")
    return res.status(400).json(errors["invalidUsernameType"]);
  if (!password) return res.status(400).json(errors["noPassword"]);
  if (typeof password !== "string")
    return res.status(400).json(errors["invalidPasswordType"]);

  // Check account exists
  const account = await findOne(client, "accounts", "username", username);
  if (!account) return res.status(401).json(errors["noAccount"]);

  // Check password is valid
  const isValid = validPassword(password, account.hash, account.salt);
  if (!isValid) return res.status(401).json(errors["invalidPassword"]);

  // Create token and sign it
  const token = createJWT(account);
  const [header, payload, signature] = token.split(".");
  const readable = [header, payload, ""].join(".");

  // Attach access cookies
  const options = {
    domain: process.env.DOMAIN,
    maxAge: process.env.EXPIRY_MINS * 60 * 1000,
    sameSite: "Strict",
    secure: true,
  };
  res.cookie("ert_notes_acc", readable, { ...options, httpOnly: false });
  res.cookie("ert_notes_acc_sig", signature, { ...options, httpOnly: true });

  return res
    .status(200)
    .json({ state: "login successful", data: { code: "200" } });
});

module.exports = router;
