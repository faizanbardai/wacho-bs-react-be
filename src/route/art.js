const express = require("express");
const router = express.Router();
const passport = require("passport");
const artModel = require("../model/art");

router.get("/", async (req, res) => {
  res.send(
    await artModel
      .find(req.query.active == 1 ? { active: true } : null)
      .select("src thumbnail thumbnailWidth thumbnailHeight caption tags")
  );
});

router.post("/", passport.authenticate("jwt"), async (req, res) => {
  const newArt = await artModel.create(req.body);
  res.send(newArt);
});

module.exports = router;
