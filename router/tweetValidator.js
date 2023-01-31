const express = require("express");
const router = express.Router();
const fs = require("fs");

const { Configuration, OpenAIApi } = require("openai");

const apiKey = process.env.OPENAI_API_KEY;
const configuration = new Configuration({
  apiKey: apiKey,
});

router.get("/", async (req, res) => {
  const openai = new OpenAIApi(configuration);
  const data = fs
    .readFileSync("./tweets.txt", "utf-8")
    .split("------NextTweet------")
    .map((item) => item.replaceAll("\n", ""));

  console.log(data);
  // data.map(async (item) => {
  try {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `Does this tweet sound like the person is talking about a financial asset. Please give me a simple yes or no response: '${data[0]}'
            `,
      temperature: 0,
      max_tokens: 256,
    });
    console.log(`Does this tweet sound like the person is talking about a financial asset. Please give me a simple yes or no response.
    ${data[0]}
  `);
    console.log(response.data.choices[0].text);
  } catch (error) {
    console.log(error);
  }
  // });
});

module.exports = router;
