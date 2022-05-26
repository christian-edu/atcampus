// import GroupService from "../service/groupService";
// import { IGroupRepo } from "../repo/IGroupRepo";
// import { createMock } from "ts-auto-mock";
// import { method, On } from "ts-auto-mock/extension";
// import { groups, users } from "../__mocks__/mockData";
// import { IGroupService } from "../service/IGroupService";
// import mock = jest.mock;
// import { SearchDTO } from "../dto/searchDTO";
//
// describe("it should run tests on all services", () => {
//   let fakeGroupRepo: IGroupRepo;
//   let groupService: IGroupService;
//   beforeEach(() => {
//     fakeGroupRepo = createMock<IGroupRepo>();
//     groupService = new GroupService(fakeGroupRepo);
//   });
//
//   it("Should return array of groups", async () => {
//     const mockFetchGroups: jest.Mock = On(fakeGroupRepo).get(
//       method((method) => method.fetchAllGroups)
//     );
//     mockFetchGroups.mockImplementation(async () => groups);
//     const result = await groupService.fetchAllGroups();
//     expect(result.length > 0).toBe(true);
//   });
//
//   it("Should return group on add", async () => {
//     const mockAddGroup: jest.Mock = On(fakeGroupRepo).get(
//       method((method) => method.addGroup)
//     );
//     mockAddGroup.mockImplementation(async () => {
//       return groups[0];
//     });
//
//     const res = await groupService.addGroup(groups[0]);
//     expect(res.name).toBe(groups[0].name);
//   });
//
//   it("Should return group by ID", async () => {
//     const mockFetchById: jest.Mock = On(fakeGroupRepo).get(
//       method((method) => method.fetchGroupById)
//     );
//     mockFetchById.mockImplementation(async () => groups[0]);
//     const res = await groupService.fetchGroupById("1");
//     expect(res.name).toBe(groups[0].name);
//   });
//
//   it("Should delete a member from a group", async () => {
//     const mockDeleteMember: jest.Mock = On(fakeGroupRepo).get(
//       method((method) => method.deleteMember)
//     );
//     mockDeleteMember.mockImplementation(async () => groups[0]);
//     const res = await groupService.deleteMember("1", "2");
//     expect(res.name).toBe(groups[0].name);
//     expect(mockDeleteMember).toHaveBeenCalledWith("1", "2");
//   });
//
//   it("Should add a member", async () => {
//     const mockAddMember: jest.Mock = On(fakeGroupRepo).get(
//       method((method) => method.addMember)
//     );
//     mockAddMember.mockImplementation(async () => groups[0]);
//
//     const res = await groupService.addMember("1", "2");
//
//     expect(res.name).toBe(groups[0].name);
//     expect(mockAddMember).toHaveBeenCalledWith("1", "2");
//   });
//
//   it("Should return group members", async () => {
//     const mockFetchMembers: jest.Mock = On(fakeGroupRepo).get(
//       method((method) => method.fetchGroupMembers)
//     );
//     mockFetchMembers.mockImplementation(async () => users);
//
//     const res = await groupService.fetchGroupMembers("1");
//     expect(res.length > 0).toBe(true);
//     expect(res[0].email).toBe(users[0].email);
//   });
//
//   it("Should update a group", async () => {
//     const mockUpdateGroup: jest.Mock = On(fakeGroupRepo).get(
//       method((method) => method.updateGroup)
//     );
//     mockUpdateGroup.mockImplementation(async () => groups[0]);
//     const res = await groupService.updateGroup(groups[0]);
//
//     expect(res.name).toBe(groups[0].name);
//   });
//
//   it("Should delete a group", async () => {
//     const mockDeleteGroup: jest.Mock = On(fakeGroupRepo).get(
//       method((method) => method.deleteGroup)
//     );
//     mockDeleteGroup.mockImplementation(async () => true);
//
//     const res = await groupService.deleteGroup("1");
//     expect(res).toBe(true);
//   });
//
//   it("Should search for a group", async () => {
//     const searchDto = new SearchDTO(
//       "Norsk",
//       "HYBRID",
//       "W2",
//       "A",
//       "8",
//       ["PG2351"],
//       "Oslo",
//       "HK"
//     );
//
//     const mockSearch: jest.Mock = On(fakeGroupRepo).get(
//       method((method) => method.searchGroup)
//     );
//     mockSearch.mockImplementation(async () => groups);
//
//     const res = await groupService.searchGroup(searchDto);
//     expect(Object.keys(res).length > 0).toBe(true);
//   });
// });

import { Repository } from "typeorm";
import { UserEntity } from "../entity/UserEntity";
import { IUserService } from "../service/IUserService";
import { createMock } from "ts-auto-mock";
import UserService from "../service/userService";
import { SchoolEntity } from "../entity/SchoolEntity";
import { GroupEntity } from "../entity/GroupEntity";
import { UserOutDto } from "../dto/UserInOutDto";
import { method, On } from "ts-auto-mock/extension";
import { UserDto } from "../dto/userDto";

describe("Tests for user service", () => {
  let fakeUserRepo: Repository<UserEntity>;
  let fakeSchoolRepo: Repository<SchoolEntity>;
  let fakeGroupRepo: Repository<GroupEntity>;
  let userService: IUserService;
  beforeEach(() => {
    fakeUserRepo = createMock<Repository<UserEntity>>();
    fakeSchoolRepo = createMock<Repository<SchoolEntity>>();
    fakeGroupRepo = createMock<Repository<GroupEntity>>();
    userService = new UserService(fakeUserRepo, fakeSchoolRepo, fakeGroupRepo);
  });

  it("Should add a user", async () => {
    const userEntity = new UserEntity(
      "testuser",
      "testuser@test.com",
      "pirate",
      new SchoolEntity("School"),
      "user",
      "usersen",
      "1"
    );
    const userDto = new UserDto("testuser", "testuser@test.com", "pirate");
    const fakeAddUser: jest.Mock = On(fakeUserRepo).get(method((m) => m.save));
    fakeAddUser.mockImplementation(async () => userEntity);
    const res = await userService.addUser(userDto);
    expect(res?.email).toBe(userEntity.email);
  });

  it("Should get a user", async () => {
    const userEntity = new UserEntity(
      "testuser",
      "testuser@test.com",
      "pirate",
      new SchoolEntity("School"),
      "user",
      "usersen",
      "1"
    );
    const fakeGetUser: jest.Mock = On(fakeUserRepo).get(
      method((m) => m.findOneBy)
    );
    fakeGetUser.mockImplementation(async () => userEntity);
    const res = await userService.findUserById("1");
    expect(res?.email).toBe(userEntity.email);
    expect(fakeGetUser).toHaveBeenCalledWith({ uuid: "1" });
  });
});
