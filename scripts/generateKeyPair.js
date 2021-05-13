const crypto = require("crypto");
const fs = require("fs");

const generateKeyPair = () => {
  const options = {
    modulusLength: 4096,
    publicKeyEncoding: { type: "pkcs1", format: "pem" },
    privateKeyEncoding: { type: "pkcs1", format: "pem" },
  };
  const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", options);

  // Create the public and private key files
  fs.writeFileSync(__dirname + "/../rsa_pub.pem", publicKey);
  fs.writeFileSync(__dirname + "/../rsa_priv.pem", privateKey);
};

generateKeyPair();
