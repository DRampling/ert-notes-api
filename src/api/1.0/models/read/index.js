// Find a single listing
async function findOne(client, collection, key, value) {
  const result = await client
    .db("ert-notes")
    .collection(collection)
    .findOne({ [key]: value });

  return result;
}

module.exports = { findOne };
