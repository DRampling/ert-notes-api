const { validPassword } = require(".");

describe("validPassword", () => {
  const salt =
    "d0271c1c382771370ccba9507ab479ee44ff937ab3e994c8bc50c3ac0a100447";
  const hash =
    "91169525f113e3d12609d17ae366f34a8edba151a5bfaa3606bb2d1bff57349f09491b8f11c0a68217e17a95a27c70ffc18f9da7d9de34a20fd0e383ef0f488a";

  test("returns true with a valid password", async () => {
    const password = "testPassword123!";
    const valid = validPassword(password, hash, salt);

    expect(valid).toEqual(true);
  });

  test("returns false with an invalid password", async () => {
    const password = "wrongPassword123!";
    const valid = validPassword(password, hash, salt);

    expect(valid).toEqual(false);
  });
});
