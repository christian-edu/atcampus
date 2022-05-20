import { GradeGoal } from "../entity/enums/GradeGoal";
import { WorkFrequency } from "../entity/enums/WorkFrequency";
import { WorkType } from "../entity/enums/WorkType";

export class CriteriaDto {
  constructor(
    public gradeGoal: GradeGoal,
    public workFrequency?: WorkFrequency,
    public language?: string,
    public maxSize?: number,
    public location?: string,
    public subject?: string[],
    public workType?: WorkType,
    public school?: string
  ) {}
}
