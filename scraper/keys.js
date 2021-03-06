const { cpus } = require("node:os");
const {
  PG_HOST = "localhost",
  PG_PORT = 5432,
  PG_USER = "postgres",
  PG_PASSWORD = "postgres",
  PG_DATABASE = "media",
  REDIS_HOST = "localhost",
  REDIS_PORT = 6379,
  REDIS_CONSUMER_GROUP_NAME = "mygroup",
  REDIS_STREAM_NAME = "mystream",
  REDIS_ERROR_STREAM = "backend.error",
  BROWSER_HOST = "localhost",
  BROWSER_PORT = 3000,
  //NUMBER_OF_REPLICATIONS = cpus().length,
} = process.env;

module.exports = {
  pgHost: PG_HOST,
  pgPort: PG_PORT,
  pgUser: PG_USER,
  pgPassword: PG_PASSWORD,
  pgDatabase: PG_DATABASE,
  redisHost: REDIS_HOST,
  redisPort: REDIS_PORT,
  redisConsumerGoupName: REDIS_CONSUMER_GROUP_NAME,
  redisStreamName: REDIS_STREAM_NAME,
  redisErrorStream: REDIS_ERROR_STREAM,
  browserConnection: `ws://${BROWSER_HOST}:${BROWSER_PORT}`,
  //replicas: NUMBER_OF_REPLICATIONS,
};
