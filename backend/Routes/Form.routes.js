const express = require("express");
const multer = require("multer");
const path = require("path");
const { formModel } = require("../Models/Form.model");
const jwtMiddleware = require("../middlewares/jwtMiddleware");
const fs = require("fs");

const formRouter = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, "../uploads");
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage }).single("photo");

formRouter.use(jwtMiddleware);

formRouter.post("/", upload, async (req, res) => {
  try {
    const { age, address } = req.body;
    const userId = req.user.dealerId;
    const fullName = req.user.fullName;
    console.log(age, address, userId, fullName, req.body);

    if (!age || !address) {
      return res.status(400).json({
        msg: "Form validation failed",
        error: "age and address are required fields"
      });
    }
    if (!req.file) {
      return res.status(400).json({
        msg: "Form validation failed",
        error: "photo is a required field"
      });
    }

    const photo = path.join(__dirname, "../uploads", req.file.filename);
    const formData = new formModel({
      userId: userId,
      fullName: fullName,
      age: age,
      address: address,
      photo: photo
    });
    console.log("formData",formData);

    await formData.save();

    res.status(201).json({ msg: "Form submitted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      msg: "Something went wrong, please try again",
      error: err.message
    });
  }
});

module.exports = { formRouter };
