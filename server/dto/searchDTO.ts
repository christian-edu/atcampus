export class SearchDTO {
  constructor(
    public language: string | undefined,
    public workType: string | undefined,
    public gradeGoal: string | undefined,
    public workFrequency: string | undefined,
    public maxSize: string | undefined,
    public subject: string[] | undefined,
    public location: string | undefined,
    public school: string | undefined
  ) {}
}
