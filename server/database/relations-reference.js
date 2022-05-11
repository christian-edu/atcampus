import {Sequelize} from "sequelize";
import {createGroupModel} from "./models/groupModel";
import {createCriteriaModel} from "./models/criteriaModel";
import {createSchoolModel} from "./models/schoolModel";
import {createSubjectModel} from "./models/subjectModel";
import {createUserModel} from "./models/userModel";
import {createGroupMemberModel} from "./models/relationModels/groupMemberModel";
import {createGroupRequestModel} from "./models/relationModels/groupRequestModel";

// Hvis sequelize-konstanten eksporteres herfra, kan vi også eksportere alt annet?
const sequelize = new Sequelize("URI sannsynligvis fra process.env")

const groupModel = createGroupModel(sequelize)
const criteriaModel = createCriteriaModel(sequelize)
const schoolModel = createSchoolModel(sequelize)
const subjectModel = createSubjectModel(sequelize)
const userModel = createUserModel(sequelize)

const groupMemberModel = createGroupMemberModel(sequelize)
const groupRequestModel = createGroupRequestModel(sequelize)


const schoolToUser = schoolModel.hasMany(
    // Options kan ligge i enten hasOne() eller belongsTo()
    // FK havner uansett i schoolModel i dette tilfellet
    userModel,
    {
        foreignKey: {
            name: "uuid"
        }
    }
)
const userToSchool = userModel.belongsTo(schoolModel)


const groupToCriteria = groupModel.hasOne(
    criteriaModel,
    {
        foreignKey: {
            name: "uuid",
            allowNull: false,
            onDelete: "CASCADE"
        }
    }
)
const criteriaToGroup = criteriaModel.belongsTo(groupModel)


const schoolToCriteria = schoolModel.hasMany(
    criteriaModel,
    {
        foreignKey: {
            name: "uuid"
        }
    }
)
const criteriaToSchool = criteriaModel.belongsTo(schoolModel)


// Automatisk oppretting av koblingsentitet
const subjectToCriteria = subjectModel.belongsToMany(criteriaModel, {through: "criteria_subject"});
const criteriaToSubject = criteriaModel.belongsToMany(subjectModel, {through: "criteria_subject"})

const groupToUserMember = groupModel.belongsToMany(userModel, {through: groupMemberModel})
const userToGroupMember = userModel.belongsToMany(groupModel, {through: groupMemberModel})

const groupToUserRequest = groupModel.belongsToMany(userModel, {through: groupRequestModel})
const userToGroupRequest = userModel.belongsToMany(groupModel, {through: groupRequestModel})