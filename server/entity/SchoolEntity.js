import { EntitySchema } from "typeorm";

export const SchoolEntity = new EntitySchema({
  name: "SchoolEntity",
  tableName: "school",
  columns: {
    uuid: {
      primary: true,
      type: "uuid",
      generated: true,
    },
    name: {
      type: "string",
      nullable: false,
    },
  },
});
