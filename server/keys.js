const {
  REDIS_HOST = "localhost",
  REDIS_PORT = 6379,
  PG_DATABASE = "media",
  PG_HOST = "localhost",
  PG_PASSWORD = "",
  PG_PORT = 5432,
  PG_USER = "postgres",
  PORT = 5000,
} = process.env;

module.exports = {
  redisHost: REDIS_HOST,
  redisPort: REDIS_PORT,
  pgUser: PG_USER,
  pgHost: PG_HOST,
  pgDatabase: PG_DATABASE,
  pgPassword: PG_PASSWORD,
  pgPort: PG_PORT,
  port: PORT,
};
