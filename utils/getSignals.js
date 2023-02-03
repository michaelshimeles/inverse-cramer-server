const { Configuration, OpenAIApi } = require("openai");

const apiKey = process.env.OPENAI_API_KEY;
const configuration = new Configuration({
  apiKey: apiKey,
});

const openai = new OpenAIApi(configuration);

const getSignals = async (assets) => {
  const bias = [];

  for (let i = 0; i < assets.length; i++) {
    console.log("assets[i]", assets[i]);
  }
  console.log(bias);
  return assets;
};
module.exports = getSignals;
