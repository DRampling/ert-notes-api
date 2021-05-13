const path = require("path");
const bcrypt = require("bcrypt");
const jwtStrategy = require("passport-jwt").Strategy;
const extractJwt = require("passport-jwt").ExtractJwt;
const fs = require("fs");
const localStrategy = require("passport-local").Strategy;

const pathToKey = path.join(__dirname, "..", "rsa_pub.pem");
const PUB_KEY = fs.readFileSync(pathToKey, "utf8");
const { findOne } = require("../models");

// Confirm account exists and password is valid
const jwt = (passport) => {
  const reqJWT = extractJwt.fromAuthHeaderAsBearerToken();
  const options = { reqJWT, secretOrKey: PUB_KEY, algorithms: ["RS256"] };

  passport.use(
    new jwtStrategy(options, async ({ sub }, done) => {
      // Check account exists
      const account = await findOne(client, "accounts", "_id", sub);
      if (!account) {
        const error = {
          state: "login unsuccessful",
          data: { message: errors[noAccount], code: "401" },
        };
        return done(error, false);
      }

      // Check password is valid
      const isPasswordValid = await bcrypt.compare(password, account.password);
      if (!isPasswordValid) {
        const error = {
          state: "login unsuccessful",
          data: { message: errors[invalidPassword], code: "401" },
        };
        return done(error, false);
      }

      return done(null, account);
    })
  );
};

// Confirm account exists and password is valid
const local = new localStrategy(
  { usernameField: "username", passwordField: "password" },
  async (username, password, done) => {
    try {
      // Check account exists
      const account = await findOne(client, "accounts", "username", username);
      if (!account) return done(null, false, errors[noAccount]);

      // Check password is valid
      const isPasswordValid = await bcrypt.compare(password, account.password);
      if (!isPasswordValid) return done(null, false, errors[invalidPassword]);

      const success = { state: "login successful", data: { code: "201" } };
      return done(null, account, success);
    } catch (error) {
      return done(error);
    }
  }
);

module.exports = { local, jwt };
