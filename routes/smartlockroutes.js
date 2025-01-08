const express = require("express");

const router = express.Router();

const upload = require("../config/cloudinary");
// const validatetoken = require("../middleware/validatetokenhandler");
const {
  getsmartlocks,
  //   getfanbyid,
  createsmartlocks,
  //   updatefan,
  //   deletefan,
} = require("../controllers/smartlockscontroller");

// router.use(validatetoken);
router.get("/smartlocks", getsmartlocks);
// router.get("/fansbyid/:id", getfanbyid);
router.post("/createsmartlocks", createsmartlocks);
// router.put("/updatefan/:id", updatefan);
// router.delete("/deletefan/:id", deletefan);

module.exports = router;
