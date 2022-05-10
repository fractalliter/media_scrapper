const keys = require("../keys");
const Redis = require("ioredis");
const processMessage = require("./processor");

const redis = new Redis({
  host: keys.redisHost,
  port: keys.redisPort,
});

redis.xgroup(
  "CREATE",
  keys.redisStreamName,
  keys.redisConsumerGoupName,
  "$",
  "MKSTREAM",
  (err, res) => {
    if (err) {
      console.error(`[${process.pid}] -> group already exist`);
    } else console.log(res);
  }
);

async function listenForMessage(lastId = ">") {
  const results = await redis.xreadgroup(
    "GROUP",
    keys.redisConsumerGoupName,
    "myconsumer" + process.env.CPU_INDEX,
    "COUNT",
    1,
    "STREAMS",
    keys.redisStreamName,
    lastId
  );
  if (results) {
    const [key, messages] = results[0];

    await messages.forEach(async (message) => {
      processMessage(message);
      await redis.xack("mystream", "mygroup", message[0]);
    });
  }
  await listenForMessage(lastId);
}

listenForMessage();
