import Model, {DataTypes} from "sequelize";

// Usikker på om vi trenger denne - GroupRequestModel kan ta seg av dette
export class RequestModel extends Model {}

RequestModel.init(
    "RequestModel",
    {
        uuid: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
        },
        message: {
            type: DataTypes.TEXT // = varchar(max) i MySQL
        },
        // Usikker på om vi trenger denne kolonnen
        responded: {
            type: DataTypes.BOOLEAN
        }
    },
    {
        tableName: "request"
    }
)