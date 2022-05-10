const {
  REDIS_HOST = "localhost",
  REDIS_PORT = 6379,
  PGDATABASE = "websites",
  PGHOST = "localhost",
  PGPASSWORD = "",
  PGPORT = 5432,
  PGUSER = "postgres",
  PORT = 5000,
} = process.env;

module.exports = {
  redisHost: REDIS_HOST,
  redisPort: REDIS_PORT,
  pgUser: PGUSER,
  pgHost: PGHOST,
  pgDatabase: PGDATABASE,
  pgPassword: PGPASSWORD,
  pgPort: PGPORT,
  port: PORT,
};
