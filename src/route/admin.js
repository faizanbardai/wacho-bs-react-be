const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const passport = require("passport");
const adminModel = require("../model/admin");
const { getToken } = require("../utils/auth");

router.post(
  "/login",
  [check("username").isEmail().withMessage("A valid email is required!")],
  passport.authenticate("local"),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    try {
      const token = getToken({ _id: req.user._id });
      res.json({ token });
    } catch (error) {
      console.log(error);
      res.json(error);
    }
  }
);

router.get("/refresh-token", passport.authenticate("jwt"), async (req, res) => {
  const admin = await adminModel.findById(req.user.id);
  if (admin) {
    const token = getToken({ _id: admin.id });
    res.json({ token });
  } else {
    res.status(404).send("Admin not found!");
  }
});

// Only one admin is needed at the moment.
// router.post(
//   "/createAccount",
//   [check("username").isEmail().withMessage("A valid email is required!")],
//   async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(422).json({ errors: errors.array() });
//     }
//     try {
//     } catch (error) {}
//     try {
//       const { username, password } = req.body;
//       const response = await adminModel.register({ username }, password);
//       const token = getToken({ id: response.id });
//       res.json({ token });
//     } catch (error) {
//       switch (error.name) {
//         case "UserExistsError":
//           res.status(409).json(error);
//           break;
//         default:
//           console.log(error);
//           res.json(error);
//           break;
//       }
//     }
//   }
// );

module.exports = router;
