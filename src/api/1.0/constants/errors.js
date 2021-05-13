// Collection of error responses
const errors = {
  noAccount: {
    state: "reporting error",
    data: { message: "invalid credentials", code: "401" },
  },
  noDatabase: {
    state: "reporting error",
    data: { message: "database is offline", code: "500" },
  },
  noUsername: {
    state: "reporting error",
    data: { message: "username must be provided", code: "400" },
  },
  noPassword: {
    state: "reporting error",
    data: { message: "password must be provided", code: "400" },
  },
  invalidPassword: {
    state: "reporting error",
    data: { message: "invalid credentials", code: "401" },
  },
  invalidUsernameType: {
    state: "reporting error",
    data: { message: "username must be a string", code: "400" },
  },
  invalidPasswordType: {
    state: "reporting error",
    data: { message: "password must be a string", code: "400" },
  },
};

module.exports = { errors };
