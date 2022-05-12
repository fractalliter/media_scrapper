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
    }
  }
);

async function listenForMessage(lastId = ">") {
  try {
    const results = await redis.xreadgroup(
      "GROUP",
      keys.redisConsumerGoupName,
      "myconsumer" + process.env.CPU_INDEX,
      "BLOCK",
      0,
      "COUNT",
      1,
      "STREAMS",
      keys.redisStreamName,
      lastId
    );
    if (results) {
      const [key, messages] = results[0];
      messages.forEach(async (message) => {
        processMessage(message);
        await redis.xack(
          keys.redisStreamName,
          keys.redisConsumerGoupName,
          message[0]
        );
      });
    }
    await listenForMessage(lastId);
  } catch (error) {
    await redis.xadd(
      keys.redisErrorStream,
      "*",
      ...[error.message, error.stack]
    );
  }
}

listenForMessage();
