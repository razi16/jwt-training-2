const mongoose = require("mongoose");

const credSchema = new mongoose.Schema({
  id: Number,
  email: String,
  name: String,
  password: String,
});

module.exports = new mongoose.model("jwt", credSchema, "jwt");
