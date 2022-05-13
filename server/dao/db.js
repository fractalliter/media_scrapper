const { DataSource } = require("typeorm");
const keys = require("../keys");

const dataSource = new DataSource({
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
module.exports = {
  dataSource,
  mediaRepo: dataSource.getRepository("medias"),
};
