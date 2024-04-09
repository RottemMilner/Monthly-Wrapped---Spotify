import express from "express";
import { User } from "../db/mongo/models/user.js";
import { insertTracks } from "../db/mongo/models/track.js";
import { getRecentlyPlayedTracks } from "../api/spotifyApi.js";
import { addOrUpdateToken } from "../db/json/utils.js";
import {
  getUserWithTracks,
  getMinutesListenedForUser,
} from "../db/mongo/DButils.js";

const router = new express.Router();

router.post("/users", async (req, res) => {
  const { user, refreshToken } = req.body;
  try {
    const accessToken = req.headers["authorization"];

    addOrUpdateToken(user.spotifyId, refreshToken, accessToken);

    const tracksData = await getRecentlyPlayedTracks(accessToken);
    const upserteracksdIds = await insertTracks(tracksData);

    const value = await User.findOneAndUpdate(
      { spotifyId: user.spotifyId },
      { $set: user, $addToSet: { tracks: upserteracksdIds } },
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
    const user = await getUserWithTracks(spotifyId);
    if (!user) {
      return res.status(404).send();
    }
    res.status(200).send(user);
  } catch (e) {
    res.status(400).send();
  }
});

router.get("/users/:id/minutes", async (req, res) => {
  const spotifyId = req.params.id;
  try {
    const resultInMinutes = await getMinutesListenedForUser(spotifyId);
    res.status(200).send({ minutes: resultInMinutes });
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

export default router;
