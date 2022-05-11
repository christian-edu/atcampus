import Model, {DataTypes} from "sequelize";

// Usikker på om vi trenger denne mtp atcampus ikke lagrer brukeradresser
export class AddressModel extends Model {}

AddressModel.init(
    "Address",
    {
        // ser ut som atcampus bruker uuid i tillegg til standard ID
        uuid: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
        },
        zip_code: {
            type: DataTypes.STRING(31),
            allowNull: false
        },
        city: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        country: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        street: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        house_number: {
            type: DataTypes.STRING(7),
            allowNull: false
        }
    },
    {
        tableName: "address"

        // Beholder "createdAt" og "updatedAt"-kolonnene
    }
)