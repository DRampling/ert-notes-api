const { debug } = require(".");

test("debug", async () => {
  console.log = jest.fn();

  debug("testing...");

  expect(console.log).toHaveBeenCalledWith(
    `\x1b[${process.env.SERVER_COLOUR}%s\x1b[0m`,
    `[${process.env.SERVER_NAME}] testing...`
  );
});
