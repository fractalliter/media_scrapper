require("reflect-metadata");
const { DataSource } = require("typeorm");
const keys = require("../keys");

module.exports = new DataSource({
  type: "postgres",
  host: keys.pgHost,
  port: keys.pgPort,
  username: keys.pgUser,
  password: keys.pgPassword,
  database: keys.pgDatabase,
  entities: [require("../entity/media").entity],
  synchronize: true,
  logging: false,
});
