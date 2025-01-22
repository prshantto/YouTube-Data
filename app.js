const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const { getJson } = require("serpapi");
const bodyParser = require("body-parser");
const axios = require("axios");
const { exec } = require("child_process");
const path = require("path");

app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello World! Server is running...");
});

app.post("/getvideo", async (req, res) => {
  const url = req.body.url;
  function extractVideoId(url) {
    const pattern =
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|\S*?[?&]v=|embed\/|v\/|live\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
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

app.post("/gettranscript", (req, res) => {
  const url = req.body.url;
  function extractVideoId(url) {
    const pattern =
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|\S*?[?&]v=|embed\/|v\/|live\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(pattern);
    return match ? match[1] : null;
  }

  const transcriptScript = path.join(__dirname, "transcript.py");
  exec(
    `python3 ${transcriptScript} ${extractVideoId(url)}`,
    (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        return res.status(500).json({ error: "Error executing Python script" });
      }
      if (stderr) {
        console.error(`stderr: ${stderr}`);
        return res.status(500).json({ error: "Python script error" });
      }

      const transcript = stdout.trim();
      res.status(200).json({ transcript });
    }
  );
});

app.post("/airesponse", async (req, res) => {
  const prompt = req.body.prompt;
  const aiResponse = await axios.post(
    `${process.env.GEMINI_API_URL}?key=${process.env.GEMINI_API_KEY}`,
    {
      contents: [
        {
          parts: [
            {
              text: prompt,
            },
          ],
        },
      ],
    }
  );

  res.end(JSON.stringify(aiResponse.data));
});

module.exports = app;
