import { AppDataSource } from "../server";
import { GroupRequestEntity } from "../entity/GroupRequestEntity";

export const GroupRequestRepo = AppDataSource.getRepository(
  GroupRequestEntity
).extend({
  // custom metoder settes her
});
