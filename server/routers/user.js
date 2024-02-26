const express = require("express");
const User = require("../db/models/user");
const { Track, insertTracks } = require("../db/models/track");
const getRecentlyPlayedTracks = require("../utils/recentlyPlayed");

const router = new express.Router();

router.post("/users", async (req, res) => {
  const user = req.body;
  try {
    const accessToken = req.headers["authorization"];
    const tracksData = await getRecentlyPlayedTracks(accessToken);
    const upsertedIds = await insertTracks(tracksData);

    const value = await User.findOneAndUpdate(
      { spotifyId: user.spotifyId },
      { $set: user, $addToSet: { tracks: upsertedIds } },
      {
        upsert: true, // Create a new document if no match is found
        new: true,
      }
    );

    res.status(201).send(value);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get("/users/:id", async (req, res) => {
  const spotifyId = req.params.id;
  try {
    // 'populate' fetchs the tracks for the user
    const user = await User.findOne({ spotifyId: spotifyId }).populate(
      "tracks"
    );
    if (!user) {
      return res.status(404).send();
    }
    res.status(200).send(user);
  } catch (e) {
    res.status(400).send();
  }
});

router.delete("/users/:id", async (req, res) => {
  const spotifyId = req.params.id;
  try {
    const user = await User.findOneAndDelete({ spotifyId: spotifyId });
    if (!user) {
      return res.status(404).send();
    }
    res.status(200).send(user);
  } catch (e) {
    res.status(400).send();
  }
});

module.exports = router;
