import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryColumn,
} from "typeorm";
import { GradeGoal } from "./enums/GradeGoal";
import { WorkFrequency } from "./enums/WorkFrequency";
import { WorkType } from "./enums/WorkType";
import { SubjectEntity } from "./SubjectEntity";
import { SchoolEntity } from "./SchoolEntity";

@Entity()
export class CriteriaEntity {
  @PrimaryColumn()
  uuid: string;

  @Column({
    type: "enum",
    enum: GradeGoal,
    name: "grade_goal",
  })
  gradeGoal: GradeGoal;

  @Column({
    type: "enum",
    enum: WorkFrequency,
    name: "work_frequency",
  })
  workFrequency: WorkFrequency;

  @Column({
    type: "enum",
    enum: WorkType,
    name: "work_type",
  })
  workType: WorkType;

  @Column({ name: "max_size" })
  maxSize: number;

  @Column()
  language: string;

  @Column()
  location: string;

  @ManyToMany(() => SubjectEntity)
  @JoinTable()
  subjects: SubjectEntity[];

  @ManyToOne(() => SchoolEntity, (school) => school.criteriaCollection)
  school_uuid: SchoolEntity;
}
