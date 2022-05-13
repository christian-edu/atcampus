import { GradeGoal } from "../entity/enums/GradeGoal";
import { WorkFrequency } from "../entity/enums/WorkFrequency";
import { WorkType } from "../entity/enums/WorkType";

export class GroupCriteriaDto {
  constructor(
    public school: string | null,
    public gradeWanted: GradeGoal | null,
    public frequency: WorkFrequency | null,
    public language: string | null,
    public maxGroupSize: number | null,
    public location: string | null,
    public subject: string | null,
    public workMethod: WorkType | null
  ) {}
}
