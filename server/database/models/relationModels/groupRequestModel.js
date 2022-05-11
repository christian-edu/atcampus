import {DataTypes} from "sequelize";

export function createGroupRequestModel(sequelize) {
    return sequelize.define(
        "GroupRequestModel",
        {
            uuid: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true
            },
            message: {
                type: DataTypes.TEXT // funker som varchar(max) i MySQL og text i Postgres
            },
            // Usikker på om vi trenger denne kolonnen, tar den med foreløpig
            responded: {
                type: DataTypes.BOOLEAN,
                allowNull: false
            },
            group_uuid: {
                type: DataTypes.UUID,
                allowNull: false,
                references: {
                    model: "group",
                    key: "uuid"
                }
            },
            user_uuid: {
                type: DataTypes.UUID,
                allowNull: false,
                references: {
                    model: "user",
                    key: "uuid"
                }
            },
            recipient: {
                type: DataTypes.ENUM,
                values: ["user", "group"],
                allowNull: false
            }
        },
        {
            tableName: "group_request"
        }
    )
}