const express = require("express");
const User = require("../db/models/user");
const Track = require("../db/models/track");
const getRecentlyPlayedTracks = require("../utils/recentlyPlayed");

const router = new express.Router();

router.post("/users", async (req, res) => {
  const user = new User(req.body);
  try {
    const accessToken = req.headers["authorization"];
    const tracksData = await getRecentlyPlayedTracks(accessToken);
    const trackDocs = await Promise.all(
      tracksData.map((trackInfo) => {
        const track = new Track(trackInfo);
        return track.save();
      })
    );

    user.tracks = trackDocs.map((doc) => doc._id);
  } catch (err) {
    console.log("Error getting user tracks:", err);
  }

  try {
    await user.save();
    res.status(201).send(user);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get("/users/:id", async (req, res) => {
  const _id = req.params.id;
  try {
    const user = await User.findById(_id);
    if (!user) {
      return res.status(404).send();
    }
    res.status(200).send(user);
  } catch (e) {
    res.status(400).send();
  }
});

router.delete("/users/:id", async (req, res) => {
  const _id = req.params.id;
  try {
    const user = await User.findByIdAndDelete(_id);
    if (!user) {
      return res.status(404).send();
    }
    res.status(200).send(user);
  } catch (e) {
    res.status(400).send();
  }
});

module.exports = router;
