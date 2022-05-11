import { DataTypes } from "sequelize";

export function createGroupMemberModel(sequelize) {
    return sequelize.define(
        "GroupMemberModel",
        {
            uuid: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true
            },
            user_uuid: {
                type: DataTypes.UUID,
                allowNull: false,
                references: {
                    model: "user",
                    key: "uuid"
                }
            },
            group_uuid: {
                type: DataTypes.UUID,
                allowNull: false,
                references: {
                    model: "group",
                    key: "uuid"
                }
            },
            is_admin: {
                type: DataTypes.BOOLEAN,
                allowNull: false
            }
        },
        {
            tableName: "group_user"
        }
    )
}