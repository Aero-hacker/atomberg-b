const express = require("express");

const router = express.Router();

const upload = require("../config/cloudinary");
// const validatetoken = require("../middleware/validatetokenhandler");
const {
  getmixers,
  //   getfanbyid,
  createmixer,
  updatemixer,
  //   updatefan,
  //   deletefan,
} = require("../controllers/mixercontroller");

// router.use(validatetoken);
router.get("/mixers", getmixers);
// router.get("/fansbyid/:id", getfanbyid);
router.post("/createmixer", createmixer);
router.put("/updatemixer/:id", updatemixer);
// router.delete("/deletefan/:id", deletefan);

module.exports = router;
