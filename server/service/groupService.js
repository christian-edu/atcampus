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
}