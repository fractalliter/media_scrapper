var EntitySchema = require("typeorm").EntitySchema;

module.exports = new EntitySchema({
  name: "urls",
  tableName: "urls",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    url: {
      type: "varchar",
      unique: true,
    },
  },
});
