//index.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const connection = require("./config/db");
const { userRouter } = require("./Routes/Users.routes");
const { formRouter } = require("./Routes/Form.routes");
require("dotenv").config();

const app = express();
app.use(
  cors({
    origin: "*"
  })
);
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).send("Welcome to Headline backend api");
});

app.use("/user", userRouter);
app.use("/form", formRouter);

app.listen(process.env.PORT, async () => {
  try {
    console.log("listening on port " + process.env.PORT);
    await connection;
    console.log("succefully connnected to mongoDb atlas");
  } catch (error) {
    console.log(error);
  }
});
