import { CriteriaDto } from "./criteriaDto";
import { GroupMemberDtoUser } from "./groupMemberDto";

export class GroupInDto {
  constructor(
    public isPrivate: boolean,
    public name: string,
    public criteria: CriteriaDto,
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
    public groupMembers: GroupMemberDtoUser[],
    public rules?: string
  ) {}
}
