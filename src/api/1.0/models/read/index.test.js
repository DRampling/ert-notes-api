require("dotenv").config();
const { MongoClient } = require("mongodb");
const objectID = require("mongodb").ObjectID;

const { findOne } = require(".");

describe("findOne", () => {
  let connection;
  let db;

  const dbName = process.env.DB_NAME;
  const dbPassword = process.env.DB_PASSWORD;
  const dbUri = `mongodb+srv://Admin:${dbPassword}@cluster0.lobs9.mongodb.net/${dbName}?retryWrites=true&w=majority`;
  const dbOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  beforeAll(async () => {
    connection = await MongoClient.connect(dbUri, dbOptions);
    db = await connection.db(dbName);
  });

  afterAll(async () => {
    await connection.close();
    await db.close();
  });

  describe("accounts", () => {
    const guest = {
      _id: objectID("60944b956d5f95390fb7e646"),
      hash:
        "9c7ef5be6b18d480e44da2e5b147fa25ff497d9030555bd70bb673c099236760c14ab401be996df31fa8c62d04960de29e3cdd8ee0144010ea4da48f1e0afe34",
      salt: "fabd6169e050ca2f21dc3a87a77c95d6b0751de0d934bba5752aa55ff07cb03c",
      username: "guest",
    };

    it("should find guest account by id", async () => {
      const account = await findOne(connection, "accounts", "_id", guest._id);

      expect(account).toEqual(guest);
    });

    it("should find guest account by username", async () => {
      const account = await findOne(
        connection,
        "accounts",
        "username",
        guest.username
      );

      expect(account).toEqual(guest);
    });
  });
});
