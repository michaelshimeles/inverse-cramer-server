const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const needle = require("needle");
const fs = require("fs");

const PORT = process.env.PORT;
const TOKEN = process.env.BEARER_TOKEN;

const rulesURL = "https://api.twitter.com/2/tweets/search/stream/rules";
const streamURL =
  "https://api.twitter.com/2/tweets/search/stream?tweet.fields=public_metrics&expansions=author_id";

const rules = [{ value: "mikeshimeles" }];

// Get stream rules
async function getRules() {
  const response = await needle("get", rulesURL, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  });

  return response.body;
}

// Set stream rules
async function setRules() {
  const data = {
    add: rules,
  };

  const response = await needle("post", rulesURL, data, {
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${TOKEN}`,
    },
  });

  return response.body;
}

// Delete stream rules
async function deleteRules(rules) {
  if (!Array.isArray(rules.data)) {
    return null;
  }

  const ids = rules.data.map((rule) => rule.id);

  const data = {
    delete: {
      ids: ids,
    },
  };

  const response = await needle("post", rulesURL, data, {
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${TOKEN}`,
    },
  });

  return response.body;
}

function streamTweets() {
  const stream = needle.get(streamURL, {
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  });
  const tweetsFile = fs.readFileSync("./tweets.txt");
  stream.on("data", (data) => {
    try {
      const json = JSON.parse(data);
      fs.appendFileSync(
        "./tweets.txt",
        `${json.data.text}\n------NextTweet------\n`
      );
    } catch (error) {}
  });

  return stream;
}

(async () => {
  let currentRules;

  try {
    // Get all stream rules

    currentRules = await getRules();
    // console.log("current rules", currentRules);
    //Delete all stream rules
    const isDeleted = await deleteRules(currentRules);
    // console.log("is deleted",isDeleted);
    // Set rules based on array above
    const rulesSet = await setRules();
    // console.log("rules set", rulesSet);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }

  streamTweets();
})();

// Routers
const tweetAnalyzer = require("./router/tweetAnalyzer");
const tradeSignals = require("./router/tradeSignals");

app.use(cors());
app.use(express.json());

app.get("/", (_req, res) => {
  res.status(200).json("Welcome to Inverse Cramer Server");
});

app.use("/tweet-analyzer", tweetAnalyzer);
app.use("/trade-signals", tradeSignals);

app.listen(PORT, (_req, _res) => {
  console.log("Server is live");
});
