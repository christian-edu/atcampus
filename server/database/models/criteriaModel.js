import { DataTypes } from "sequelize";

export function createCriteriaModel(sequelize) {
  return sequelize.define(
    "CriteriaModel",
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      grade_goal: {
        type: DataTypes.ENUM,
        values: ["A, B, C, D, Bestått"],
        allowNull: false, // Eneste vi hadde som NOT NULL i ER-diagrammet
      },
      work_frequency: {
        type: DataTypes.ENUM,
        values: [
          "En gang i måneden",
          "Annenhver uke",
          "1 gang i uka",
          "2 gang i uka",
          "3 gang i uka",
          "4 gang i uka",
          "5 gang i uka",
        ],
      },
      work_type: {
        type: DataTypes.ENUM,
        values: ["Fysisk", "Digitalt", "Begge"],
      },
      max_size: {
        type: DataTypes.INTEGER,
      },
      language: {
        type: DataTypes.STRING(255),
      },
      location: {
        type: DataTypes.STRING(255),
      },
      // "school" og "subject" er koblinger
    },
    {
      tableName: "criteria",
    }
  );
}