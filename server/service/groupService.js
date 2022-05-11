import HttpException from "../httpException.js";

export default class GroupService{
    constructor(groupRepo) {
        this.repo = groupRepo;
    }


    static fetchAllGroups() {
        throw new HttpException("Not implemented!", 500);
    }
}