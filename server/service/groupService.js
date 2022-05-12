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

    async fetchGroupMembers(groupId) {
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