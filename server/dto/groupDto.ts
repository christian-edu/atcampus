import { CriteriaDto } from "./criteriaDto";
import { GroupMemberDto } from "./groupMemberDto";

export class GroupDto {
  constructor(
    public isPrivate: boolean,
    public name: string,
    public criteria: CriteriaDto,
    public groupMembers: GroupMemberDto[],
    public rules?: string,
    public uuid?: string
  ) {}
}
