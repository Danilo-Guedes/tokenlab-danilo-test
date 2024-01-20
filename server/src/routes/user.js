const express = require("express");
const { handleCreateUser } = require("../controllers/user");
const router = express.Router();


router.post("/create", (req, res) => {
  const { name, email, password, confirmPassword } = req.body;

  if (!name || !email || !password || !confirmPassword) {
    return res
      .status(400)
      .json({ error: true, message: "Missing required fields" });
  }

  handleCreateUser(req, res);

});

router.get("/me",  (req, res) => {
  res.send("Hello World!");
});

module.exports = router;