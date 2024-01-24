const User = require("../models/user");
const bcrypt = require("bcrypt");
const { createUserApiJWT } = require("../services/auth/jwt");

async function handleUserLogin(req, res) {
  const { email, password } = req.body;

  if (!password || !email) {
    return res
      .status(400)
      .json({ error: true, message: "Missing required fields" });
  }

  try {
    const row = await User.findOne({email: req.body.email}).select("+password");

    // console.log({row});

    if (!row) {
      return res.status(400).json({ error: true, message: "User not found" });
    }

    // const isPasswordValid = await bcrypt.compare(password, row.hashed_password);

    // if (!isPasswordValid) {
    //   return res
    //     .status(400)
    //     .json({ error: true, message: "Invalid credentials" });
    // }

    const userData = {
      id: row._id, 
      name: row.name,
      email: row.email,
    };

    const token = await createUserApiJWT(userData);

    return res.json({
      error: false,
      message: "User logged in successfully",
      token,
      user: userData,
    });
  } catch (error) {
    console.error(error);
  }
}

module.exports = { handleUserLogin };
