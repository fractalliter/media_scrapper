const { cpus } = require("node:os");
const {
  PG_HOST = "localhost",
  PG_PORT = 5432,
  PG_USER = "postgres",
  PG_PASSWORD = "postgres",
  PG_DATABASE = "websites",
  REDIS_HOST = "localhost",
  REDIS_PORT = 6379,
  REDIS_CONSUMER_GROUP_NAME = "mygroup",
  REDIS_STREAM_NAME = "mystream",
  NUMBER_OF_REPLICATIONS = cpus().length,
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
  replicas: NUMBER_OF_REPLICATIONS,
};
