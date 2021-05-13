const atob = require("atob");

const { createJWT } = require(".");

describe("createJWT", () => {
  let token;

  const mapChar = (c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);

  beforeAll(() => {
    token = createJWT({ _id: 123 });
  });

  test("JWT looks valid", async () => {
    expect(token).toMatch(new RegExp(`^Bearer ?`));
    expect(token.split(".").length).toEqual(3);
  });

  test("JWT contains expected properties", async () => {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const uriComponent = atob(base64).split("").map(mapChar).join("");
    const jsonPayload = decodeURIComponent(uriComponent);
    const payload = JSON.parse(jsonPayload);

    expect(payload).toEqual({
      exp: expect.any(Number),
      iat: expect.any(Number),
      sub: 123,
    });
  });
});
