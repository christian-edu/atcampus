import { AppDataSource } from "../server";
import { GroupMemberEntity } from "../entity/GroupMemberEntity";

export const GroupMemberRepo = AppDataSource.getRepository(
  GroupMemberEntity
).extend({
  // filtreres til GroupMemberEntity.users
  findUsers(group_uuid: string) {
    return this.createQueryBuilder("members")
      .where("members.group_uuid = :group_uuid", { group_uuid })
      .getMany();
  },

  findGroups(user_uuid: string) {
    return this.createQueryBuilder("members")
      .where("members.user_uuid = :user_uuid", { user_uuid })
      .getMany();
  },
});
