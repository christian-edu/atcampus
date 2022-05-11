import {DataTypes} from "sequelize";
import {hashSync} from "bcrypt";

export function createUserModel(sequelize) {
    return sequelize.define(
        "UserModel",
        {
            uuid: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true
            },
            first_name: {
                type: DataTypes.STRING(255),
                allowNull: false // Må fjernes om vi skal forholde oss til anonymitet
            },
            last_name: {
                type: DataTypes.STRING(255),
                allowNull: false // Må fjernes om vi skal forholde oss til anonymitet
            },
            username: {
                type: DataTypes.STRING(255),
                allowNull: false,
                unique: true
            },
            email: {
                type: DataTypes.STRING(255),
                isEmail: true, // innebygd email-sjekk!
                allowNull: false
            },
            password: {
                type: DataTypes.STRING(255),
                allowNull: false,
                // Usikker på om vi skal ha passord-hashing her eller et annet sted
                set(value) {
                    this.setDataValue("password", hashSync(value, 10))
                }
            }
        },
        {
            tableName: "user"
        }
    )
}