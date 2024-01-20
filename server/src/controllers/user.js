
const User  = require("../models/user");

async function handleCreateUser(req, res) {

  const { name, email, password, confirmPassword } = req.body;

  if (password !== confirmPassword) {
    return res
      .status(400)
      .json({ error: true, message: "Passwords do not match" });
  }

  try {

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

async function handleGetUser(req, res) {
  const user = null; //implement


  if (!user) {
    res.status(400).json({ error: true, message: "User Not Found" });
  } else {
    res.status(200).json(user);
  }
}

module.exports = { handleCreateUser, handleGetUser };
