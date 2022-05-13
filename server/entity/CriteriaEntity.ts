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
import { v4 as uuidv4 } from "uuid";
import { GroupCriteriaDto } from "../dto/groupCriteriaDto";

@Entity()
export class CriteriaEntity {
  constructor(dto: GroupCriteriaDto) {
    this.uuid = uuidv4();
    this.grade_goal = dto.gradeGoal;
    this.work_frequency = dto.workFrequency;
    this.work_type = dto.workType;
    this.max_size = dto.maxSize;
    this.language = dto.language;
    this.location = dto.location;
    this.subjects = dto.subject;
    this.school_uuid = dto.school;
  }

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
  work_frequency: WorkFrequency | null;

  @Column({
    type: "enum",
    enum: WorkType,
  })
  work_type: WorkType | null;

  @Column()
  max_size: number | null;

  @Column()
  language: string | null;

  @Column({ type: "string" })
  location: string | null;

  @ManyToMany(() => SubjectEntity)
  @JoinTable()
  subjects: string[] | SubjectEntity[] | null;

  @ManyToOne(() => SchoolEntity, (school) => school.criteriaCollection)
  school_uuid: SchoolEntity | string | null;
}
