const keys = require("./keys");
const Redis = require("ioredis");
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const redis = new Redis({
  host: keys.redisHost,
  port: keys.redisPort,
});

// Express route handlers
app.post("/url/", async (req, res) => {
  const data = req.body;
  console.log(data);
  for (const url of data.urls) {
    await redis.xadd("mystream", "*", ...["url", url]);
  }
  res.json({ message: "cargo recieved" });
});

app.listen(keys.port, (err) => {
  if (err) {
    console.error(err);
  } else console.log(`Listening on ${keys.port}`);
});
