import { CriteriaDto } from "./criteriaDto";
import { GroupMemberDto_both } from "./groupMemberDto";

export class GroupDto {
  constructor(
    public isPrivate: boolean,
    public name: string,
    public criteria: CriteriaDto,
    public groupMembers: GroupMemberDto_both[],
    public rules?: string,
    public uuid?: string
  ) {}
}
