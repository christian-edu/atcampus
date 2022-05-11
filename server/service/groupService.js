import HttpException from "../httpException.js";
import {groupNames} from "../mockData.js";

export default class GroupService {
    constructor(groupRepo) {
        this.repo = groupRepo;
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
}