import {createGroupModel} from "../database/models/groupModel";
import {createGroupRequestModel} from "../database/models/relationModels/groupRequestModel";
import {createGroupMemberModel} from "../database/models/relationModels/groupMemberModel";
import {createUserModel} from "../database/models/userModel";

export class GroupRepo {
    constructor(serialize) {
        this.mainModel = createGroupModel(serialize);
        this.requestModel = createGroupRequestModel(serialize);
        this.memberModel = createGroupMemberModel(serialize);
        this.userModel = createUserModel(serialize)
    }


}