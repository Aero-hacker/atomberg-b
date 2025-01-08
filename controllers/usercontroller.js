const users = require("../models/usermodel");
const asynchandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registeruser = asynchandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(404);
    throw new Error("all fields are mandatory");
  }
  const hashpassword = await bcrypt.hash(password, 10);
  const user = await users.create({
    name,
    email,
    password: hashpassword,
  });
  res.status(200).json(user);
});

const loginuser = asynchandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(404);
    throw new Error("all fields are mandatory");
  }

  const user = await users.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    const accessToken = jwt.sign(
      {
        user: {
          name: user.name,
          email: user.email,
          id: user.id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "45m" }
    );
    res.status(200).json({ accessToken });
  } else {
    res.status(401);
    throw new Error("email or password is not valid");
  }
});

const currentuser = (req, res) => {
  res.status(200).json(req.user);
};

module.exports = {
  registeruser,
  loginuser,
  currentuser,
};
