import {EntitySchema} from "typeorm";

export const CategoryEntity = new EntitySchema({
    name: "CriteriaEntity",
    tableName: "criteria",
    columns: {
        uuid: {
            // Må sjekke opp hvordan dette gjøres riktig
            primary: true,
            type: "uuid",
            generated: true
        },
        grade_goal: {
            type: "enum",
            enum: ["A, B, C, D, Bestått"],
            nullable: false
        },
        work_frequency: {
            type: "enum",
            enum: [
                "En gang i måneden",
                "Annenhver uke",
                "1 gang i uka",
                "2 gang i uka",
                "3 gang i uka",
                "4 gang i uka",
                "5 gang i uka"
            ]
        },
        work_type: {
            type: "enum",
            enum: [
                "Fysisk",
                "Digitalt",
                "Begge"
            ]
        },
        max_size: {
            type: "int"
        },
        language: {
            type: "string"
        },
        location: {
            type: "string"
        }
    }
})