const fans = require("../models/fansmodel");
const asynchandler = require("express-async-handler");
const cloudinary = require("../config/cloudinary");

const getfans = asynchandler(async (req, res) => {
  const fan = await fans.find();
  if (!fan || fan.length === 0) {
    return res.status(404).json({ message: "No posts exist" });
  }
  res.status(200).json(fan);
});

const getfanbyid = asynchandler(async (req, res) => {
  const fan = await fans.findById(req.params.id);
  if (!fan) {
    return res.status(404).json({ message: "No post exists with this ID" });
  }
  res.status(200).json(fan);
});

const createfan = asynchandler(async (req, res) => {
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

  const fan = await fans.create({
    title,
    colors,
    actualprice,
    currentprice,
    discount,
    images,
  });

  if (fan) {
    res.status(201).json(fan);
  } else {
    res.status(400);
    throw new Error("Fan creation failed.");
  }
});

const updatefan = asynchandler(async (req, res) => {
  // Find the fan by ObjectId
  const fan = await fans.findById(req.params.id);
  if (!fan) {
    return res.status(404).json({ message: "Fan doesn't exist" });
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

  // Update the fan record
  const updatedFan = await fans.findByIdAndUpdate(
    req.params.id,
    { $set: updates },
    { new: true, runValidators: true } // Return the updated document and apply schema validations
  );

  // Respond with the updated fan
  res.status(200).json(updatedFan);
});

const deletefan = asynchandler(async (req, res) => {
  const fan = await fans.findById(req.params.id);
  if (!fan) {
    return res.status(404).json({ message: "Post doesn't exist" });
  }

  if (fan.user_id?.toString() !== req.user.id) {
    return res
      .status(403)
      .json({ message: "User doesn't have permission to delete this post" });
  }

  await fans.deleteOne({ _id: req.params.id });
  res.status(200).json({ message: "Post deleted successfully" });
});

module.exports = {
  getfans,
  getfanbyid,
  createfan,
  updatefan,
  deletefan,
};
