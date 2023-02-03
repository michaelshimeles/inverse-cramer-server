const { Configuration, OpenAIApi } = require("openai");

const apiKey = process.env.OPENAI_API_KEY;
const configuration = new Configuration({
  apiKey: apiKey,
});

const openai = new OpenAIApi(configuration);

const getAssets = async (tweet, assetTweets) => {
  const assets = [];

  for (let i = 0; i < tweet.length; i++) {
    if (assetTweets[i] === "\nYes") {
      try {
        const response = await openai.createCompletion({
          model: "text-davinci-003",
          prompt: `Analyze the tweet before and list out the different stocks mentioned with their ticker symbols. Do not ADD any stocks that are not mentioned. Indicate the sentiment of the person who wrote the tweet (Bullish or Bearish) next to each stock. Use the format: (Company Name, Ticker Symbol, Bullish/Bearish), and so on. 
                ${tweet[i]}`,
          temperature: 0,
          max_tokens: 256,
        });
        assets.push(response?.data?.choices[0]?.text);
      } catch (error) {
        console.log(error);
      }
    }
  }
  return assets;
};

module.exports = getAssets;
