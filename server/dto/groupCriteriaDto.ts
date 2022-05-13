export class GroupCriteriaDto {
  constructor(
    public school: string | null,
    public gradeGoal: string | null,
    public workFrequency: string | null,
    public language: string | null,
    public maxSize: number | null,
    public location: string | null,
    public subject: string[] | null,
    public workType: string | null
  ) {}
}
