const express = require("express");

const validatetoken = require("../middleware/validatetokenhandler");
const router = express.Router();
const {
  registeruser,
  loginuser,
  currentuser,
} = require("../controllers/usercontroller");

router.post("/register", registeruser);
router.post("/login", loginuser);
router.get("/current", validatetoken, currentuser);

module.exports = router;
