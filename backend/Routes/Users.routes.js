// Routes/Users.routes.js
const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();
const { userModel } = require("../Models/User.model");

const userRouter = express.Router();

userRouter.post("/registor", async (req, res) => {
  try {
    const { fullName, email, password, city } = req.body;
    const exitingUser = await userModel.findOne({ email: email });

    if (exitingUser) {
      res
        .status(409)
        .send({ message: "Email already exists, please login instead." });
    } else {
      bcrypt.hash(password, 5, async function (err, hashedPassword) {
        if (err) {
          res.status(500).send({
            msg: "Something went wrong,please try again",
            error: err.message
          });
        } else {
          const user = new userModel({
            fullName: fullName,
            email: email,
            password: hashedPassword,
            city
          });
          await user.save();
          res.status(201).send({ msg: "User registered successfully" });
        }
      });
    }
  } catch (err) {
    res.status(500).send({
      msg: "Something went wrong,please try again",
      error: err.message
    });
  }
});

userRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const expiresIn = "2h";
    const user = await userModel.findOne({ email: email });
    if (user) {
      bcrypt.compare(password, user.password, (err, result) => {
        if (result) {
          const token = jwt.sign(
            { dealerId: user._id, fullName: user.fullName },
            process.env.JWT_SECRET_KEY,
            { expiresIn }
          );
          res.status(200).send({ message: "Login successful", token: token, user: user.fullName });
        } else {
          res.status(401).send({
            message:
              "Authentication Failed.Credentials dont match in record with ones provided.Please check your login credentials"
          });
        }
      });
    } else {
      res.status(404).send({ message: "Please register yourself first" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal server error" });
  }
});

module.exports = { userRouter };
