import { Column, Entity, PrimaryColumn } from "typeorm";
import { GradeGoal } from "./enums/GradeGoal";
import { WorkFrequency } from "./enums/WorkFrequency";
import { WorkType } from "./enums/WorkType";

@Entity()
export class CriteriaEntity {
  @PrimaryColumn()
  uuid: string;

  @Column({
    type: "enum",
    enum: GradeGoal,
  })
  grade_goal: GradeGoal;

  @Column({
    type: "enum",
    enum: WorkFrequency,
  })
  work_frequency: WorkFrequency;

  @Column({
    type: "enum",
    enum: WorkType,
  })
  work_type: WorkType;

  @Column()
  max_size: number;

  @Column()
  language: string;

  @Column()
  location: string;

  // Mangler relations, fikser senere
}
