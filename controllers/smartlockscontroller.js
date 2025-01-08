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

module.exports = {
  getsmartlocks,
  createsmartlocks,
};
