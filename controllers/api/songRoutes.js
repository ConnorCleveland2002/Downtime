const router = require("express").Router();
const express = require("express");
const { Song } = require("../../Models");
var SpotifyWebAPI = require("spotify-web-api-node");
const axios = require("axios").default;

router.get("/", async (req, res) => {
  try {
    const token = process.env.token;
    const songsRaw = await axios({
      method: "GET",
      url: "https://api.spotify.com/v1/playlists/4f7Z4a4jtI9ow3tGAX200y",
      headers: { Authorization: `Bearer ${token}` },
    });
    const songs = songsRaw.data.tracks.items.map((song) => {
      const newSong = {
        song_title: song.track.name,
        artist: song.track.artists[0].name,
        album: song.track.album.name,
        song_link: song.track.external_urls.spotify,
      };
      return newSong;
    });
    Song.bulkCreate(songs, {
      individualHooks: true,
      returning: true,
    });
    res.json(songs);
  } catch (error) {
    res.json(error);
  }
});

// router.get("/", async (req, res) => {
//   try {
//     console.log("testing songs");
//     const token =
//       "BQDQO_K3T1Kpi3TSvIZ65KmgTIk_4_4BsEGu50ZIKoklZauDc1cPFhs96QaqCntY2b1mOGmMNDrrkX-j1xVwZkyyxz-nLks7OaDvNz5Gm54CwGqr1nMDHhoJbSCk7XG9AzIydYuYF9QDFc8RXgHbU2WmZBlEruI9eqEkEkwOg2VM5_K18mhmPyIffA";
//     const songsRaw = await axios({
//       method: "GET",
//       url: "https://api.spotify.com/v1/playlists/4f7Z4a4jtI9ow3tGAX200y",
//       headers: { Authorization: `Bearer ${token}` },
//     });
//     const songs = songsRaw.data.tracks.items.map((song) => {
//       const newSong = {
//         song_title: song.track.name,
//         artist: song.track.artists[0].name,
//         album: song.track.album.name,
//         song_link: song.track.external_urls.spotify,
//       };
//       return newSong;
//     });
//     console.log(songs);
//     Song.bulkCreate(songs, {
//       individualHooks: true,
//       returning: true,
//     });
//     res.json(songs);
//   } catch (error) {
//     res.json(error);
//   }
// });

router.get("/:id", async (req, res) => {
  try {
    const singleSongData = await Song.findOne(req.params.id);
    console.log(singleSongData);
    res.render("song", singleSongData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  try {
    const newSong = await Song.create({
      song_title: req.body.song_title,
      artist: req.body.artist,
      album: req.body.album,
      song_link: req.body.song_link,
    });

    res.status(200).json(newSong);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const projectSong = await Song.destroy({
      where: {
        song_id: req.params.id,
      },
    });

    res.status(200).json(projectSong);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
