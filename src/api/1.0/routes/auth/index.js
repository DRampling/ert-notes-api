const router = require("express").Router();

const { getDB } = require("../../models");

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const { client, db } = getDB();

  // Check database client is connected
  if (!client || !db)
    return res.status(500).json({
      state: "reporting error",
      data: { message: "database is offline", code: "500" },
    });

  // Check username is present
  if (!username)
    return res.status(422).json({
      state: "reporting error",
      data: { message: "username must be provided", code: "422" },
    });

  // Check password is present
  if (!password)
    return res.status(422).json({
      state: "reporting error",
      data: { message: "password must be provided", code: "422" },
    });

  res.status(201).json({
    state: "login successful",
    data: {},
  });
});

module.exports = router;
