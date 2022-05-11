import HttpException from "../httpException.js";
import {groupNames} from "../mockData.js";

export default class GroupService {
    constructor(groupRepo) {
        this.repo = groupRepo;
    }

    fetchAllGroups() {
        return groupNames;
    }

    addGroup(group) {
        groupNames.push(group);
    }


    fetchGroupById(groupId) {
        throw new HttpException("Not implemented!", 500);
    }
}