const express = require("express");
const router = express.Router();
const tweetPuller = require("../utils/tweetPuller");
const tweetChecker = require("../utils/tweetChecker");
const getAssets = require("../utils/getAssets");
const getSignals = require("../utils/getSignals");

router.get("/", async (req, res) => {
  const tweets = tweetPuller();

  console.log("Tweets", tweets);
  const assetTweets = await tweetChecker(tweets);

  console.log("assetTweets", assetTweets);
  const assets = await getAssets(tweets, assetTweets);
  console.log("assets", assets);

  const signals = await getSignals(assets);
  console.log("Signals", signals);
});

module.exports = router;
