import HttpException from "../httpException.js";

export default class GroupService{
    constructor(groupRepo) {
        this.repo = groupRepo;
    }

    fetchAllGroups() {
        throw new HttpException("Not implemented!", 500);
    }

    addGroup(group) {
        return undefined;
    }
}