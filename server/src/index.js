const express = require("express");
const cors = require("cors");

const mongoose = require("mongoose");

const userRouter = require("./routes/user");
const authRouter = require("./routes/auth");
const eventRouter = require("./routes/event");

const app = express();

//MIDDLEWARES
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//ROUTES
app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/events", eventRouter);

app.listen(3000, async () => {
  await mongoose.connect("mongodb://localhost:27017/tokenlab");
  console.log("mongoose connected");
  console.log("Server is running on port 3000");
});

app.get("/api/hello", (req, res) => {
  return res.send("Hello World!");
});
