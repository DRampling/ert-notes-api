/**
 * Log a message to the terminal, prefixing the server, and applying an identifiable colour.
 * @param {string} message - The content to show in the terminal.
 */
const debug = (message) =>
  console.log(
    `\x1b[${process.env.SERVER_COLOUR}%s\x1b[0m`,
    `[${process.env.SERVER_NAME}] ${message}`
  );

module.exports = { debug };
