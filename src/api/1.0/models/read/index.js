/**
 * Find a single listing.
 * @param {MongoClient} client - A MongoClient that is connected to a cluster with the database.
 * @param {string} collection - Collection to search.
 * @param {string} key - Field to search by.
 * @param {string} value - Value to match.
 */
async function findOne(client, collection, key, value) {
  const result = await client
    .db("ert-notes")
    .collection(collection)
    .findOne({ [key]: value });

  return result;
}

module.exports = { findOne };
