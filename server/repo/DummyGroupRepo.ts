import { IGroupRepo } from "./IGroupRepo";
import { GroupDto } from "../dto/groupDto";
import { UserDto } from "../dto/userDto";

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
