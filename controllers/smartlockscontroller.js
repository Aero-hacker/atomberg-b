const smartlocks = require("../models/smartlocksmodel");
const asynchandler = require("express-async-handler");
const cloudinary = require("../config/cloudinary");
const { ModifiedPathsSnapshot } = require("mongoose");

const getsmartlocks = asynchandler(async (req, res) => {
  const locks = await smartlocks.find();
  if (!locks || locks.length === 0) {
    return res.status(404).json({ message: "No posts exist" });
  }
  res.status(200).json(locks);
});

const createsmartlocks = asynchandler(async (req, res) => {
  const { title, colors, actualprice, currentprice, discount, images } =
    req.body;

  if (
    !title ||
    !colors ||
    !actualprice ||
    !currentprice ||
    !discount ||
    !images
  ) {
    res.status(400);
    throw new Error("All fields are mandatory.");
  }

  if (!Array.isArray(images) || images.length === 0) {
    res.status(400);
    throw new Error("Images must be a non-empty array of strings.");
  }

  const locks = await smartlocks.create({
    title,
    colors,
    actualprice,
    currentprice,
    discount,
    images,
  });

  if (locks) {
    res.status(201).json(locks);
  } else {
    res.status(400);
    throw new Error("Fan creation failed.");
  }
});

const updatesmartlocks = asynchandler(async (req, res) => {
  // Find the smart lock by ObjectId
  const smartlock = await smartlocks.findById(req.params.id);
  if (!smartlock) {
    return res.status(404).json({ message: "Smart Lock doesn't exist" });
  }

  // Define allowed fields for updates
  const allowedUpdates = [
    "title",
    "colors",
    "actualprice",
    "currentprice",
    "discount",
    "images",
  ];

  // Filter the request body to include only allowed fields
  const updates = {};
  Object.keys(req.body).forEach((key) => {
    if (allowedUpdates.includes(key)) {
      updates[key] = req.body[key];
    }
  });

  // Update the smart lock record
  const updatedSmartLock = await smartlocks.findByIdAndUpdate(
    req.params.id,
    { $set: updates },
    { new: true, runValidators: true } // Return the updated document and apply schema validations
  );

  // Respond with the updated smart lock
  res.status(200).json(updatedSmartLock);
});

module.exports = {
  getsmartlocks,
  createsmartlocks,
  updatesmartlocks,
};
