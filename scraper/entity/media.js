var EntitySchema = require("typeorm").EntitySchema;

const MediaType = {
  VIDEO: "video",
  IMAGE: "image",
};

module.exports = new EntitySchema({
  name: "medias",
  tableName: "medias",
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
    media_type: {
      type: "enum",
      enum: MediaType,
      default: MediaType.IMAGE,
    },
  },
});
