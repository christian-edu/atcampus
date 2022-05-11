import HttpException from "../httpException.js";
import {groupNames} from "../mockData.js";
import {createGroupModel} from "../database/models/groupModel";
import {createUserModel} from "../database/models/userModel";
import {createGroupMemberModel} from "../database/models/relationModels/groupMemberModel";
import {createGroupRequestModel} from "../database/models/relationModels/groupRequestModel";
import {createCriteriaModel} from "../database/models/criteriaModel";
import {createSchoolModel} from "../database/models/schoolModel";
import {createSubjectModel} from "../database/models/subjectModel";

export default class GroupService {
    // For at relasjonene skal fungere, må jeg ha med ALT her
    // Oh lord, give me strength
    constructor(sequelize) {

        this.groupModel = createGroupModel(sequelize);

        this.criteriaModel = createCriteriaModel(sequelize);
        this.userModel = createUserModel(sequelize);
        this.schoolModel = createSchoolModel(sequelize);
        this.subjectModel = createSubjectModel(sequelize)

        this.groupMembersModel = createGroupMemberModel(sequelize);
        this.groupRequestModel = createGroupRequestModel(sequelize);

        this.schoolToUser = this.schoolModel.hasMany(
            // Options kan ligge i enten hasOne() eller belongsTo()
            // FK havner uansett i schoolModel i dette tilfellet
            this.userModel,
            {
                foreignKey: {
                    name: "uuid"
                }
            }
        )
        this.userToSchool = this.userModel.belongsTo(this.schoolModel)
    }

    async fetchAllGroups() {
        return groupNames;
    }

    async addGroup(group) {
        groupNames.push(group);
    }

    async fetchGroupById(groupId) {
        throw new HttpException("Not implemented!", 500);
    }

    async deleteMember(group, user) {
        throw new HttpException("Not implemented!", 500);

    }
    async addMember(group, user) {
        throw new HttpException("Not implemented", 500);
    }

    async getGroupMembers(groupId) {
        if (!groupId) throw new HttpException("group_id request parameter must be specified",400);
        throw new HttpException("Not implemented", 500);
    }

    async updateGroup(group) {
        if (!group) throw new HttpException("No group found in body. Expected {\ngroup: groupName\n}",400);
        throw new HttpException("Not implemented", 500);
    }

    async deleteGroup(group) {
        if (!group) throw new HttpException("No group found in body. Expected {\ngroup: groupName\n}",400);
        throw new HttpException("Not implemented", 500);
    }

    async searchGroup(searchDto) {
        if (!searchDto) throw new HttpException("No searchDto provided",400);
        throw new HttpException("Not implemented", 500);
    }
}