const keys = require("../keys");
const Redis = require("ioredis");
const dataSource = require("../dao/db");
const puppeteer = require("puppeteer-core");

let browser = null;
const mediaRepo = dataSource.getTreeRepository("medias");
const redis = new Redis({
  host: keys.redisHost,
  port: keys.redisPort,
});
async function listenForMessage(lastId = ">") {
  const results = await redis.xreadgroup(
    "GROUP",
    keys.redisConsumerGoupName,
    "scraper_consumer" + process.env.CPU_INDEX,
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
      try {
        const page = await browser.newPage();
        await page.goto(message[1][1]);
        const medias = await page.evaluate(() =>
          [
            Array.from(document.images).map((image) => ({
              url: image.src,
              media_type: "image",
              media_metadata: {
                width: image.width,
                height: image.height,
                alt: image.alt,
              },
            })),
            Array.from(document.getElementsByTagName("video")).map((video) => ({
              url: video.src,
              media_type: "video",
              media_metadata: {
                width: video.width,
                height: video.height,
                duration: video.duration,
                title: video.title,
              },
            })),
          ].flat()
        );
        await mediaRepo.save(medias);
        redis.xack(
          keys.redisStreamName,
          keys.redisConsumerGoupName,
          message[0],
          (error, res) => {
            if (error) {
              redis.xadd(
                keys.redisErrorStream,
                "*",
                ...[error.message, error.stack]
              );
            }
          }
        );
      } catch (error) {
        await redis.xadd(
          keys.redisErrorStream,
          "*",
          ...[error.message, error.stack]
        );
      }
    });
  }
  await listenForMessage(lastId);
}
async function scraperWorker() {
  try {
    await redis.xgroup(
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
  } catch (error) {
    console.error(`[${process.pid}] -> group already exist`);
  }
  try {
    browser = await puppeteer.connect({
      browserWSEndpoint: keys.browserConnection,
    });
    await listenForMessage();
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    await browser?.close();
  }
}
scraperWorker();
