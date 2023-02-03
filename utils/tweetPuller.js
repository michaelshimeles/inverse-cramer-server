const fs = require("fs");

const tweetPuller = () => {
  const data = fs
    .readFileSync("./tweets.txt", "utf-8")
    .split("------NextTweet------")
    .map((item) => item.replaceAll("\n", ""));
  data.pop();

  return data;
};

module.exports = tweetPuller;
