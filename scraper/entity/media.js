var EntitySchema = require("typeorm").EntitySchema;

const MediaType = {
  VIDEO: "video",
  IMAGE: "image",
};

module.exports = {
  entity: new EntitySchema({
    name: "medias",
    tableName: "medias",
    columns: {
      id: {
        primary: true,
        type: "int",
        generated: true,
      },
      url: {
        type: "text",
      },
      media_type: {
        type: "enum",
        enum: MediaType,
        default: MediaType.IMAGE,
      },
      media_metadata: {
        type: "json",
      },
    },
  }),
  MediaType,
};
