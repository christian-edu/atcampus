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

@Entity()
export class CriteriaEntity {
  constructor(
    gradeGoal: GradeGoal,
    workFrequency = WorkFrequency.ANY,
    workType = WorkType.ANY,
    maxSize = 255,
    language = "",
    location = "",
    subjects?: SubjectEntity[],
    school?: SchoolEntity
  ) {
    this.uuid = uuidv4();
    this.grade_goal = gradeGoal;
    this.work_frequency = workFrequency;
    this.work_type = workType;
    this.max_size = maxSize;
    this.language = language;
    this.location = location;
    if (subjects) {
      this.subjects = subjects;
    } else {
      this.subjects = new Array<SubjectEntity>();
    }
    this.school_uuid = school;
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
  work_frequency: WorkFrequency | undefined;

  @Column({
    type: "enum",
    enum: WorkType,
  })
  work_type: WorkType | undefined;

  @Column()
  max_size: number | undefined;

  @Column()
  language: string | undefined;

  @Column()
  location: string | undefined;

  @ManyToMany(() => SubjectEntity)
  @JoinTable()
  subjects: SubjectEntity[];

  @ManyToOne(() => SchoolEntity, (school) => school.criteriaCollection)
  school_uuid: SchoolEntity | undefined;
}
