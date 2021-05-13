const path = require("path");
const jwtStrategy = require("passport-jwt").Strategy;
const extractJwt = require("passport-jwt").ExtractJwt;
const fs = require("fs");
const objectID = require("mongodb").ObjectID;

const pathToKey = path.join(__dirname, "../../../../", "rsa_pub.pem");
const PUB_KEY = fs.readFileSync(pathToKey, "utf8");
const { findOne, getDB } = require("../models");
const { errors } = require("../constants/errors");

// Confirm account exists and password is valid
const jwt = (passport) => {
  const options = {
    jwtFromRequest: extractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: PUB_KEY,
    algorithms: ["RS256"],
  };

  passport.use(
    new jwtStrategy(options, async ({ sub }, done) => {
      console.log(sub);
      // Check database client is connected
      const { client, db } = getDB();
      if (!client || !db) return res.status(500).json(errors["noDatabase"]);

      // Check account exists
      const account = await findOne(client, "accounts", "_id", objectID(sub));
      if (!account) return done(errors["noAccount"].data.message, false);

      return done(null, account);
    })
  );
};

module.exports = { jwt };
