const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
const cors = require("cors");
require("dotenv").config();

const MONGODB_URI = process.env.MONGODB_URL;

const workItemRoutes = require("./routes/workItem");
const adminRoutes = require("./routes/admin");

const app = express();

const fileStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "images");
  },
  filename: function (req, file, cb) {
    cb(null, uuidv4() + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

app.use(bodyParser.json());
app.use(cors());
app.use(multer({ storage: fileStorage, fileFilter }).array("image", 12));
app.use("/images", express.static(path.join(__dirname, "images")));

app.use("/api/admin", adminRoutes);
app.use("/api", workItemRoutes);

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message, data });
});

mongoose.set("strictQuery", true);
mongoose
  .connect(MONGODB_URI)
  .then((result) => {
    app.listen(8080);
    console.log("Server started");
  })
  .catch((err) => console.log(err));
