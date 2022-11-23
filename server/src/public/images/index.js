const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet");
const dotenv = require("dotenv");
const morgan = require("morgan");
var cors = require("cors");
const app = express();
app.use(cors());
const userRoute = require("./src/routes/users");
const authRoute = require("./src/routes/auth");
const postRoute = require("./src/routes/posts");
const multer = require("multer");
const path = require("path");

dotenv.config();

//Testing if database connects
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true }, () => {
  console.log("Connected to MongoDb");
});

//If path is /images then go there
app.use("/images", express.static(path.join(__dirname, "src/public/images")));

//Middleware
app.use(express.json());
//Helmet provodes security to headers and Morgan allows customised console.log
app.use(helmet());
app.use(morgan("common"));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "src/public/images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  try {
    return res.status(200).json("File uploaded successfully. ");
  } catch (err) {
    console.log(err);
  }
});

app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);

//Testing if app works
app.listen(8800, () => {
  console.log("Backend server online");
});
