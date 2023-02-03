const express = require("express");
const router = express.Router();
const fs = require("fs");

const { Configuration, OpenAIApi } = require("openai");

const apiKey = process.env.OPENAI_API_KEY;
const configuration = new Configuration({
  apiKey: apiKey,
});

router.get("/", async (req, res) => {
  const data = fs.readFileSync("./result.json");

  res.status(200).json(JSON.parse(data));
});

module.exports = router;
