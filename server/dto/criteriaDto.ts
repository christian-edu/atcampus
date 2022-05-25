import { GradeGoal } from "../entity/enums/GradeGoal";
import { WorkFrequency } from "../entity/enums/WorkFrequency";
import { WorkType } from "../entity/enums/WorkType";
import { MaxSize } from "../entity/enums/MaxSize";

export class CriteriaDto {
  constructor(
    public gradeGoal?: GradeGoal,
    public workFrequency?: WorkFrequency,
    public language?: string,
    public maxSize?: MaxSize,
    public location?: string,
    public subjects?: string[],
    public workType?: WorkType,
    public school?: string,
    public uuid?: string
  ) {}
}
