import { GroupCriteriaDto } from "./groupCriteriaDto";
import { GroupMemberDto } from "./groupMemberDto";

export class GroupDto {
  constructor(
    public isPrivate: boolean | null,
    public name: string,
    public rules: string | null,
    public criteria: GroupCriteriaDto | null,
    public uuid: string | null,
    public groupMember: GroupMemberDto[] | null
  ) {}
}
