require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;


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

mongoose
  .connect(process.env.MONGO_DB_URI)
  .then(() => {
    console.log("Database connected");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to database:', error);
    process.exit(1);
  });

