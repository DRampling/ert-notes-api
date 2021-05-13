const express = require("express");
const request = require("supertest");

const router = require(".");
const { connectToDB, disconnectFromDB } = require("../../models/connection");

jest.mock("../../../../helpers/debug");

describe("login routes", () => {
  const app = express();
  app.use(express.json());
  app.use("/api/1.0/auth", router);

  describe("POST requests", () => {
    beforeAll(async () => await connectToDB(app));

    afterAll(async () => await disconnectFromDB());

    describe("can handle a malformed username", () => {
      test("can handle empty username", async () => {
        const { statusCode, body } = await request(app)
          .post("/api/1.0/auth/login")
          .send({ username: "", password: "guest" });
        const response = {
          state: "reporting error",
          data: { code: "400", message: "username must be provided" },
        };

        expect(statusCode).toEqual(400);
        expect(body).toEqual(response);
      });

      test("can handle malformed username", async () => {
        const { statusCode, body } = await request(app)
          .post("/api/1.0/auth/login")
          .send({ username: 123, password: "guest" });
        const response = {
          state: "reporting error",
          data: { code: "400", message: "username must be a string" },
        };

        expect(statusCode).toEqual(400);
        expect(body).toEqual(response);
      });
    });

    describe("can handle a malformed password", () => {
      test("can handle empty password", async () => {
        const { statusCode, body } = await request(app)
          .post("/api/1.0/auth/login")
          .send({ username: "guest", password: "" });
        const response = {
          state: "reporting error",
          data: { code: "400", message: "password must be provided" },
        };

        expect(statusCode).toEqual(400);
        expect(body).toEqual(response);
      });

      test("can handle malformed password", async () => {
        const { statusCode, body } = await request(app)
          .post("/api/1.0/auth/login")
          .send({ username: "guest", password: 123 });
        const response = {
          state: "reporting error",
          data: { code: "400", message: "password must be a string" },
        };

        expect(statusCode).toEqual(400);
        expect(body).toEqual(response);
      });
    });

    test("can handle not finding a user", async () => {
      const { statusCode, body } = await request(app)
        .post("/api/1.0/auth/login")
        .send({ username: "abc", password: "abc" });
      const response = {
        state: "reporting error",
        data: { code: "401", message: "invalid credentials" },
      };

      expect(statusCode).toEqual(401);
      expect(body).toEqual(response);
    });

    test("can handle an invalid password", async () => {
      const { statusCode, body } = await request(app)
        .post("/api/1.0/auth/login")
        .send({ username: "guest", password: "abc" });
      const response = {
        state: "reporting error",
        data: { code: "401", message: "invalid credentials" },
      };

      expect(statusCode).toEqual(401);
      expect(body).toEqual(response);
    });

    test("can handle valid credentials and generate a JWT", async () => {
      const { statusCode, body } = await request(app)
        .post("/api/1.0/auth/login")
        .send({ username: "guest", password: "guest" });
      const response = {
        state: "login successful",
        data: { code: "200", token: expect.any(String) },
      };

      expect(statusCode).toEqual(200);
      expect(body).toEqual(response);
    });

    test("can handle no database connection", async () => {
      await disconnectFromDB();

      const { statusCode, body } = await request(app)
        .post("/api/1.0/auth/login")
        .send({ username: "guest", password: "guest" });
      const response = {
        state: "reporting error",
        data: { code: "500", message: "database is offline" },
      };

      expect(statusCode).toEqual(500);
      expect(body).toEqual(response);
    });
  });
});
