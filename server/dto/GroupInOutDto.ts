import { CriteriaDto } from "./criteriaDto";
import { GroupMemberDto_user } from "./groupMemberDto";

export class GroupInDto {
  constructor(
    public isPrivate: boolean,
    public name: string,
    public criteria: CriteriaDto,
    public admin_uuid: string,
    public rules?: string,
    public uuid?: string
  ) {}
}

export class GroupOutDto {
  constructor(
    public uuid: string,
    public isPrivate: boolean,
    public name: string,
    public criteria: CriteriaDto,
    public groupMembers: GroupMemberDto_user[],
    public rules?: string
  ) {}
}
