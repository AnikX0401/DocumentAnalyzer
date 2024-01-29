const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Invalid Email");
      }
    },
  },
  businessName: {
    type: String,
    required: true,
    trim: true,
  },
  businessDescription: {
    type: String,
    required: true,
    trim: true,
  },
  workType:{
    type: String,
    trim: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    trim: true,
    minlength: 10,
  },
  currentWebsiteUrl: {
    type: String,
    trim: true,
  },
  verificationToken: {
    type: String,
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],

});

const userModel = new mongoose.model("users", userSchema);
module.exports = userModel;
