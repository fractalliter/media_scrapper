const keys = require("./keys");
const Redis = require("ioredis");
const express = require("express");
const cors = require("cors");
const { dataSource, mediaRepo } = require("./dao/db");

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

module.exports = dataSource.initialize();

const redis = new Redis({
  host: keys.redisHost,
  port: keys.redisPort,
});

// Express route handlers
app.post("/url/", async (req, res) => {
  const data = req.body;
  for (const url of data.urls) {
    await redis.xadd("mystream", "*", ...["url", url]);
  }
  res.json({ message: "cargo recieved" });
});

app.get("/media", async (req, res) => {
  const { page = 1, size = 10, category } = req.query;
  const [medias, total] = await mediaRepo.findAndCount({
    where: { media_type: category },
    skip: page * size,
    take: size,
  });
  res.json({
    data: medias,
    total,
    nextPage: medias.length < 10 ? null : page + 1,
    size,
  });
});

app.listen(keys.port, (err) => {
  if (err) {
    console.error(err);
  } else console.log(`Listening on ${keys.port}`);
});
