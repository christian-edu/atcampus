import { CriteriaDto } from "./criteriaDto";

export class GroupInDto {
  constructor(
    public isPrivate: boolean,
    public name: string,
    public criteria: CriteriaDto,
    public admin_uuid: string,
    public rules?: string
  ) {}
}
