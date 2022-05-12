import { EntitySchema } from "typeorm";

export const SubjectEntity = new EntitySchema({
  name: "SubjectEntity",
  tableName: "subject",
  columns: {
    uuid: {
      type: "uuid",
      primary: true,
      generated: true,
    },
    name_and_or_code: {
      type: "string",
      nullable: false,
    },
  },
});
