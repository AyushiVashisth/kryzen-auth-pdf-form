// Models/Form.model.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const formSchema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
  fullName: { type: String, required: true }, 
  age: { type: Number, required: true },
  address: { type: String, required: true },
  photo: { type: String, required: true } 
});

const formModel = mongoose.model("form", formSchema);
module.exports = { formModel };
