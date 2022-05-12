import { IGroupRepo } from "./IGroupRepo";
import { GroupDto, UserDto } from "../service/groupService";

export default class DummyGroupRepo implements IGroupRepo {
  addGroup(): GroupDto {
    throw Error("Not implemented");
  }

  addMember(): boolean {
    return false;
  }

  deleteGroup(): boolean {
    return false;
  }

  deleteMember(): boolean {
    return false;
  }

  fetchAllGroups(): GroupDto[] {
    return [];
  }

  fetchGroupById(): GroupDto {
    throw Error("Not implemented");
  }

  fetchGroupMembers(): UserDto[] {
    return [];
  }

  searchGroup(): GroupDto[] {
    return [];
  }

  updateGroup(): boolean {
    return false;
  }
}
