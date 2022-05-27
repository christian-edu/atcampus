import { CriteriaDto } from "./criteriaDto";
import { GroupMemberDtoBoth } from "./groupMemberDto";

export class GroupDto {
  constructor(
    public isPrivate: boolean,
    public name: string,
    public criteria: CriteriaDto,
    public groupMembers: GroupMemberDtoBoth[],
    public rules?: string,
    public uuid?: string
  ) {}
}
