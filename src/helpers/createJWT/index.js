const jsonwebtoken = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");

// Create a JWT with a one day expiry
const createJWT = ({ _id }) => {
  const payload = { sub: _id, iat: Date.now() };
  const pathToKey = path.join(__dirname, "../../../", "rsa_priv.pem");
  const PRIV_KEY = fs.readFileSync(pathToKey, "utf8");
  const options = { expiresIn: "1d", algorithm: "RS256" };

  return "Bearer " + jsonwebtoken.sign(payload, PRIV_KEY, options);
};

module.exports = { createJWT };
