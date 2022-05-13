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
    this.grade_goal = dto.gradeWanted;
    this.work_frequency = work_frequency;
    this.work_type = work_type;
    this.max_size = max_size;
    this.language = language;
    this.location = location;
    this.subjects = subjects;
    this.school_uuid = school_uuid;
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

  @ManyToMany(() => SubjectEntity)
  @JoinTable()
  subjects: SubjectEntity[];

  @ManyToOne(() => SchoolEntity, (school) => school.criteriaCollection)
  school_uuid: SchoolEntity;
}
