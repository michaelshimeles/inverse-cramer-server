const { Configuration, OpenAIApi } = require("openai");

const apiKey = process.env.OPENAI_API_KEY;
const configuration = new Configuration({
  apiKey: apiKey,
});

const openai = new OpenAIApi(configuration);

const tweetChecker = async (data) => {
  const result = [];
  for (let i = 0; i < data.length; i++) {
    try {
      const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `Does this tweet sound like the person is talking about a Stocks, Crypto, or any other financial asset. Please give me a simple yes or no response: '${data[i]}'
      `,
        temperature: 0,
        max_tokens: 256,
      });
      result.push(response?.data?.choices[0]?.text);
    } catch (error) {
      console.log(error);
    }
  }
  return result;
};
module.exports = tweetChecker;
