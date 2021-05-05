const { MongoClient } = require("mongodb");
require("dotenv").config();

const { debug } = require("../../../../helpers/debug");

const state = { db: null, client: null };

/**
 * Connects to database cluster.
 */
const connectToDB = async (app) => {
  if (state.db) return;

  const dbName = process.env.DB_NAME;
  const dbPassword = process.env.DB_PASSWORD;
  const dbUri = `mongodb+srv://Admin:${dbPassword}@cluster0.lobs9.mongodb.net/${dbName}?retryWrites=true&w=majority`;
  const dbOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
  const client = new MongoClient(dbUri, dbOptions);

  state.db = await client.connect();
  state.client = client;

  debug("Server connected to cluster");
  await listDatabases(client);
  app.emit("Database connected");
};

/**
 * Disconnects from database cluster.
 */
const disconnectFromDB = async () => {
  if (state.client) {
    await state.client.close();
    state.client = null;
  }

  if (state.db) {
    await state.db.close();
    state.db = null;
  }

  debug("Server disconnected from database");
};

/**
 * Provides a reference to the connection & database.
 * @returns database
 */
const getDB = () => ({ db: state.db, client: state.client });

/**
 * Print the names of all available databases
 * @param {MongoClient} client A MongoClient that is connected to a cluster
 */
const listDatabases = async (client) => {
  const list = await client.db().admin().listDatabases();

  debug("Databases ready:");
  list.databases.forEach((db) => debug(` - ${db.name}`));
};

module.exports = { connectToDB, disconnectFromDB, getDB };
