const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validatetoken = asyncHandler(async (req, res, next) => {
  let token;
  let authheader = req.headers.Authorization || req.headers.authorization;
  if (authheader && authheader.startsWith("Bearer")) {
    token = authheader.split(" ")[1];
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        res.status(401);
        throw new Error("user is not authorized");
      }
      req.user = decoded.user;
      next();
    });
  } else {
    res.status(401).json({ message: "Token not provided or invalid" });
  }
});

module.exports = validatetoken;
