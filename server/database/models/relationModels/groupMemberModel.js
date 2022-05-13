import { DataTypes } from "sequelize";

export function createGroupMemberModel(sequelize) {
  return sequelize.define(
    "GroupMemberModel",
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      userUuid: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "user",
          key: "uuid",
        },
      },
      groupUuid: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "group",
          key: "uuid",
        },
      },
      isAdmin: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
    },
    {
      tableName: "group_user",
    }
  );
}
