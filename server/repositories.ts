import {AppDataSource} from "./AppDataSource";
import {UserEntity} from "./entity/UserEntity";
import {ChatMessageEntity} from "./entity/ChatMessageEntity";
import {CriteriaEntity} from "./entity/CriteriaEntity";
import {GroupMemberEntity} from "./entity/GroupMemberEntity";
import {GroupEntity} from "./entity/GroupEntity";
import {GroupRequestEntity} from "./entity/GroupRequestEntity";
import {SchoolEntity} from "./entity/SchoolEntity";
import {SubjectEntity} from "./entity/SubjectEntity";
import {DeleteResult, Repository} from "typeorm";


type repoTypes = {
    userRepo: Repository<UserEntity>;
    chatMessageRepo: Repository<ChatMessageEntity>;
    criteriaRepo: Repository<CriteriaEntity>;
    groupMemberRepo: Repository<GroupMemberEntity>;
    groupRequestRepo: Repository<GroupRequestEntity>;
    groupRepo: Repository<GroupEntity>;
    schoolRepo: Repository<SchoolEntity>;
    subjectRepo: Repository<SubjectEntity>;
}
export const repositories: Promise<repoTypes> = (() => {
    return AppDataSource.initialize()
        .then(dataSource => {
            return {
                userRepo: dataSource.getRepository(UserEntity),
                chatMessageRepo: dataSource.getRepository(ChatMessageEntity),
                criteriaRepo: dataSource.getRepository(CriteriaEntity),
                groupMemberRepo: dataSource.getRepository(
                    GroupMemberEntity
                ).extend({
                    // filtreres til GroupMemberEntity.users
                    findUsers(group_uuid: string) {
                        return this.createQueryBuilder("members")
                            .where("members.group_uuid = :group_uuid", {group_uuid})
                            .getMany();
                    },

                    findGroups(user_uuid: string) {
                        return this.createQueryBuilder("members")
                            .where("members.user_uuid = :user_uuid", {user_uuid})
                            .getMany();
                    },
                }),
                groupRequestRepo: dataSource.getRepository(GroupRequestEntity),
                groupRepo: dataSource.getRepository(GroupEntity).extend({
                    // custom metoder settes her
                    deleteById(group_uuid: string) {
                        return this.createQueryBuilder()
                            .delete()
                            .from(GroupEntity)
                            .where("uuid = :uuid", {group_uuid})
                            .execute();
                    },

                    findByName(name: string) {
                        return this.findOneBy({name: name});
                    },
                }),
                schoolRepo: dataSource.getRepository(SchoolEntity),
                subjectRepo: dataSource.getRepository(SubjectEntity)
            }
        });
})();