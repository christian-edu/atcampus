import { GroupCriteriaDto } from "./groupCriteriaDto";
import { GroupMemberDto } from "./groupMemberDto";

export class GroupDto {
  constructor(
    public isPrivate: boolean,
    public name: string,
    public criteria: GroupCriteriaDto,
    public groupMembers: GroupMemberDto[],
    public rules?: string,
    public uuid?: string
  ) {}
}
