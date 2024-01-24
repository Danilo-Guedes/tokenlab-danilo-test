const express = require("express");
const { handlecreateUser, handleGetUsers } = require("../controllers/user");
const authMiddleware = require("../middlewares/auth")
const router = express.Router();


router.post("/create", (req, res) => {  // MUDAR PARA EXPRESS-VALIDATOR
  const { name, email, password, confirmPassword } = req.body;

  if (!name || !email || !password || !confirmPassword) {
    return res
      .status(400)
      .json({ error: true, message: "Missing required fields" });
  }

  handlecreateUser(req, res);

});

router.get("/me",  (req, res) => {
  res.send("Hello World!");
});

router.get("/", authMiddleware, handleGetUsers)

module.exports = router;