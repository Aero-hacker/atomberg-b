const mongoose = require("mongoose");

const smartlocksschema = mongoose.Schema(
  {
    // Uncomment if a fan is associated with a user
    // user_id: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   required: true,
    //   ref: "user",
    // },
    title: {
      type: String,
      required: [true, "Title is mandatory"],
    },
    colors: {
      type: [String],
      required: [true, "Colors are mandatory"],
      validate: {
        validator: (value) => value.length > 0,
        message: "At least one color is required",
      },
    },
    actualprice: {
      type: Number,
      required: [true, "Actual price is mandatory"],
    },
    currentprice: {
      type: Number,
      required: [true, "Current price is mandatory"],
    },
    discount: {
      type: Number,
      required: [true, "Discount is mandatory"],
      min: [0, "Discount cannot be less than 0"],
      max: [100, "Discount cannot be greater than 100"],
    },
    images: {
      type: [String], // Array of strings for image URLs
      required: [true, "At least one image is mandatory"],
      validate: {
        validator: (value) => value.length > 0,
        message: "At least one image is required",
      },
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

module.exports = mongoose.model("smartlocks", smartlocksschema);
