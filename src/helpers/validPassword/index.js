const crypto = require("crypto");

// Validate the provided password
const validPassword = (password, hash, salt) => {
  const hashVerify = crypto
    .pbkdf2Sync(password, salt, 10000, 64, "sha512")
    .toString("hex");

  return hash === hashVerify;
};

module.exports = { validPassword };
