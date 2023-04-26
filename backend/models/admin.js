const mongoose = require("mongoose");

const { Schema } = mongoose;

const adminSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  personal_email: {
    type: String,
    required: true,
  },
  work_email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
  },
  role: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Admin", adminSchema);
