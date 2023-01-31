const express = require("express");
const router = express.Router();

const { Configuration, OpenAIApi } = require("openai");

const apiKey = process.env.OPENAI_API_KEY;
const configuration = new Configuration({
  apiKey: apiKey,
});

router.get("/", async (req, res) => {
  const openai = new OpenAIApi(configuration);

  try {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `Can you tell me the exact opposite of what this tweet is saying?
          `,
      temperature: 0,
      max_tokens: 256,
    });
    res.status(200).json(response.data);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
