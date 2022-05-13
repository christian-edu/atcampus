export class GroupCriteriaDto {
  constructor(
    public school: string | null,
    public gradeWanted: string | null,
    public frequency: string | null,
    public language: string | null,
    public maxGroupSize: number | null,
    public location: string | null,
    public subject: string | null,
    public workMethod: string | null
  ) {}
}
