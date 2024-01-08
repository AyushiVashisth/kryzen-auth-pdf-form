// Models/User.model.js
const mongoose = require("mongoose");

const Schema = mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

const userModel = mongoose.model("user", Schema);

module.exports = { userModel };
