const crypto = require("crypto");

// Generate salt and hash from provided password
const genPassword = () => {
  const password = process.argv[3];
  // Check password exists
  if (!password || typeof password !== "string") {
    const yellow = `\x1b[33m%s\x1b[0m`;
    console.log(yellow, "ERROR: Provide a valid password to salt and hash.");
    console.log(yellow, "npm generate-salt-and-hash <my_password>");
    return;
  }

  // Create random salt to generate hash
  const salt = crypto.randomBytes(32);
  const hash = crypto.pbkdf2Sync(password, salt, 10000, 64, "sha512");
  console.log(`\x1b[36m%s\x1b[0m`, `SALT: ${salt.toString("hex")}`);
  console.log(`\x1b[35m%s\x1b[0m`, `HASH: ${hash.toString("hex")}`);
};

genPassword();
