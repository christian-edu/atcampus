import {DataTypes} from "sequelize";

export function createSubjectModel(sequelize) {
    return sequelize.define(
        "SubjectModel",
        {
            uuid: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true
            },
            name_and_or_code: {
                type: DataTypes.STRING(255),
                allowNull: false
            }
        }
    )
}