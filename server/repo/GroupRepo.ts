import { AppDataSource } from "../server";
import { GroupEntity } from "../entity/GroupEntity";

export const GroupRepo = AppDataSource.getRepository(GroupEntity).extend({
  // custom metoder settes her
  deleteById(group_uuid: string) {
    return this.createQueryBuilder()
      .delete()
      .from(GroupEntity)
      .where("uuid = :uuid", { group_uuid })
      .execute();
  },

  findByName(name: string) {
    return this.findOneBy({ name: name });
  },
});
