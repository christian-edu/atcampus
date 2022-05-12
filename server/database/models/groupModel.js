import {DataTypes} from "sequelize";

export function createGroupModel(sequelize) {
    return sequelize.define(
        "GroupModel",
        {
            uuid: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true
            },
            name: {
                type: DataTypes.STRING(255),
                allowNull: false, // kan kanskje være NULL før man får mer enn ett medlem?
                unique: true      // ...men da blir dette et problem
            },
            open_for_membership: {
                type: DataTypes.BOOLEAN,
                defaultValue: true,
                allowNull: false,
                set(value) {
                    this.setDataValue("open_for_membership", value);
                    if (!value) {
                        this.setDataValue("public", value)
                    }
                }
            },
            public: {
                type: DataTypes.BOOLEAN,
                allowNull: false
            }
        },
        {
            tableName: "group"
        }
    )
}
