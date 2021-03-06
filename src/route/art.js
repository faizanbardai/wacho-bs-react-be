const express = require("express");
const router = express.Router();
const passport = require("passport");
const artModel = require("../model/art");

router.get("/", async (req, res) => {
  res.send(
    await artModel.find(req.query.active == 1 ? { active: true } : null).sort([['updatedAt', -1]])
  );
});

router.post("/", passport.authenticate("jwt"), async (req, res) => {
  const newArt = await artModel.create(req.body);
  res.send(newArt);
});

// update art
router.put("/sold", async (req, res) => {
  const { artIDs } = req.body;
  artIDs.forEach(async (_id) => {
    await artModel.findByIdAndUpdate(_id, { active: false });
  });

  const soldArt = await artModel.find({
    _id: {
      $in: artIDs,
    },
  });
  res.send(soldArt);
});

router.put("/",passport.authenticate("jwt"), async(req, res)=>{
  const updatedArt = await artModel.findByIdAndUpdate(req.query.id,req.body, {new: true});
  res.send(updatedArt);
})

module.exports = router;
