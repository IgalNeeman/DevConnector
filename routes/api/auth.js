const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator"); // "/check"
const jwt = require("jsonwebtoken");
const config = require("config");
const User = require("../../models/User");

// @route  GET api/auth
// @desc   Test route
// @Access public
router.get("/", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

// @route  POST api/auth
// @desc   Authhenticate user & get token
// @Access public
router.post(
  "/",
  [
    check("email", "please include a vaild email").isEmail(),
    check("password", "Password is Required").exists()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid Credentials" }] });
      }
      //כל מה שהוא מחק שמתי בהערה שיעור 14
      // const avatar = gravatar.url(email, { s: "200", r: "pg", d: "mm" });
      //  user = new User({ name, email, avatar, password });
      // const salt = await bcrypt.genSalt(10);
      //user.password = await bcrypt.hash(password, salt);
      //await user.save();
      // See if user exists
      // Get users gravatar
      // Encrypt password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: "Invalid Credentials" }] });
      }
      const payload = { user: { id: user.id } };
      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      ); // הוא מחק פה את ה res.send משהו בפרק  12
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;
