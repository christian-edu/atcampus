import {
  Column,
  Entity,
  JoinColumn,
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
import { MaxSize } from "./enums/MaxSize";

@Entity()
export class CriteriaEntity {
  constructor(
    gradeGoal = GradeGoal.PASS,
    workFrequency = WorkFrequency.ANY,
    workType = WorkType.ANY,
    maxSize = MaxSize.ANY,
    language = "",
    location = "",
    school = new SchoolEntity(),
    subjects?: SubjectEntity[]
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
    }
    this.school = school;
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

  @Column({
    type: "enum",
    enum: MaxSize,
  })
  max_size: MaxSize;

  @Column()
  language: string;

  @Column()
  location: string;

  @ManyToMany(() => SubjectEntity)
  @JoinTable({ name: "criteria_subjects" })
  @JoinColumn({ name: "subject_uuid" })
  subjects: SubjectEntity[] | undefined;

  @ManyToOne(() => SchoolEntity, (school) => school.criteriaCollection)
  @JoinColumn({ name: "school_uuid" })
  school: SchoolEntity;
}
