const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");

//Register
router.post("/register", async (req, res) => {
  try {
    //To hide password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });

    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(500);
  }
});

//Login
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json("User not found");
    }

    const validatePassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    // !validatePassword && res.status(400).json("Wrong password");

    return res.status(200).json(user);
  } catch (err) {
    return res.status(500).json(500);
  }
});

module.exports = router;
