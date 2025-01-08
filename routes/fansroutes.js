const express = require("express");

const router = express.Router();

const upload = require("../config/cloudinary");
// const validatetoken = require("../middleware/validatetokenhandler");
const {
  getfans,
  getfanbyid,
  createfan,
  updatefan,
  deletefan,
} = require("../controllers/fanscontroller");

// router.use(validatetoken);
router.get("/fans", getfans);
router.get("/fansbyid/:id", getfanbyid);
router.post("/createfan", createfan);
router.put("/updatefan/:id", updatefan);
router.delete("/deletefan/:id", deletefan);

module.exports = router;
