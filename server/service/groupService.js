import HttpException from "../httpException.js";
import {groupNames} from "../mockData.js";

export default class GroupService{
    constructor(groupRepo) {
        this.repo = groupRepo;
    }

    fetchAllGroups() {
        return groupNames;
    }

    addGroup(group) {
        app.post("/api/v1/groups", (req, res) => {
            groupNames.push(newGroup)
            res.status(200)
        });
    }


    fetchGroupById(groupId) {
        throw new HttpException("Not implemented!", 500);
    }
}