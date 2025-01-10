const dotenv = require("dotenv").config();
const cors = require("cors");
const express = require("express");
const connectdb = require("./config/dbconnection");
const app = express();
const port = process.env.PORT || 8000;
connectdb();
app.use(cors());
app.set("view engine", "ejs");
app.use(express.json());

app.use("/api/users", require("./routes/userroutes"));
app.use("/api/fans", require("./routes/fansroutes"));
app.use("/api/mixers", require("./routes/mixersroutes"));
app.use("/api/locks", require("./routes/smartlockroutes"));
// app.get("/", (req, res) => {
//   console.log("acess");
//   return res.render("upload");
// });

app.listen(port, () => {
  console.log(`you are listening to port:${port}`);
});
