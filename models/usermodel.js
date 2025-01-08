const mongoose = require("mongoose");

const userschema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "username is mandatory"],
    },
    email: {
      type: String,
      required: [true, "email is mandatory"],
    },
    password: {
      type: String,
      required: [true, "password is mandatory"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("user", userschema);
