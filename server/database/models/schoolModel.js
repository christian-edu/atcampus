import {DataTypes} from "sequelize";

export function createSchoolModel(sequelize) {
    return sequelize.define(
        "SchoolModel",
        {
            uuid: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true
            },
            name: {
                type: DataTypes.STRING(63),
                allowNull: false
            }
        },
        {
            tableName: "school"
        }
    )
}