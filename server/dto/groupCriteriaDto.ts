import { GradeGoal } from "../entity/enums/GradeGoal";
import { WorkFrequency } from "../entity/enums/WorkFrequency";
import { WorkType } from "../entity/enums/WorkType";
import { SchoolEntity } from "../entity/SchoolEntity";
import { SubjectEntity } from "../entity/SubjectEntity";

export class GroupCriteriaDto {
  constructor(
    public school: string | SchoolEntity | null, // Må finne ut av dette
    public gradeGoal: GradeGoal,
    public workFrequency: WorkFrequency | null,
    public language: string | null,
    public maxSize: number | null,
    public location: string | null,
    public subject: string[] | SubjectEntity[] | null,
    public workType: WorkType | null
  ) {}
}
