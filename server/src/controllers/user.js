const User = require("../models/user");

async function handlecreateUser(req, res) {
  const { name, email, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    return res
      .status(400)
      .json({ error: true, message: "Passwords do not match" });
  }

  try {
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).json({
        error: true,
        message: "The Email provided already has a user associated",
      });
    }

    const newUser = {
      name,
      email,
      password,
    };

    let user = await User.create(newUser);
    user = user.toObject();

    if (!user) {
      res.status(400).json({ error: true, message: "User Not Created" });
    }

    delete user.password;
    delete user.confirmPassword;

    console.log("user created", JSON.stringify(user));

    res.status(201).json(user);
  } catch (error) {
    console.error(error);
  }
}

async function handleGetUsers(req, res) {
  try {
    const { id } = req.body.user;

    let users = await User.find({ _id: { $ne: id } });

    if (!users) {
      return res.status(400).json({ error: true, message: "User Not Found" });
    }

    res.status(200).json(users);
  } catch (error) {
    console.log(error);
  }
}

module.exports = { handlecreateUser, handleGetUsers };
