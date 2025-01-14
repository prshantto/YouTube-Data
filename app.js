const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const { getJson } = require("serpapi");

app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World! Server is running...");
});

app.get("/get-yt-video", async (req, res) => {
  const url = req.query.url;
  function extractVideoId(url) {
    const pattern =
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|\S*?[?&]v=|embed\/|v\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(pattern);
    return match ? match[1] : null;
  }

  const response = await getJson({
    engine: "youtube_video",
    api_key: process.env.API_KEY,
    v: extractVideoId(url),
  });

  const videoData = {
    title: response.title,
    description: response.description,
    thumbnail: response.thumbnail,
  };

  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(videoData));
});

module.exports = app;
