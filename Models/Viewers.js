const mongoose = require("mongoose");
const validator = require("validator");

const viewerSchema = new mongoose.Schema({
  fname: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("not valid email");
      }
    },
  },
  message: {
    type: String,
    required: true,
  },
});

const portfolioDb = new mongoose.model("Viewers", viewerSchema);
module.exports = portfolioDb;
