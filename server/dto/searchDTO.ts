import * as QueryString from "querystring";

export class SearchDTO {
  constructor(
    public language: string | undefined,
    public workMethod: string | undefined,
    public gradeGoal: string | undefined,
    public frequency: string | undefined,
    public size: string | undefined,
    public subject: string | undefined,
    public place: string | undefined,
    public school: string | undefined
  ) {}
}
