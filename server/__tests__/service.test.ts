import { createMock } from "ts-auto-mock";
import { method, On } from "ts-auto-mock/extension";
import { groupEntities, groupInDtos } from "../__mocks__/mockData";
import { IGroupService } from "../service/IGroupService";
import { Repository } from "typeorm";
import { UserEntity } from "../entity/UserEntity";
import { SchoolEntity } from "../entity/SchoolEntity";
import { GroupEntity } from "../entity/GroupEntity";
import { IUserService } from "../service/IUserService";
import UserService from "../service/userService";
import { UserDto } from "../dto/userDto";
import { GroupMemberEntity } from "../entity/GroupMemberEntity";
import { SubjectEntity } from "../entity/SubjectEntity";
import { CriteriaEntity } from "../entity/CriteriaEntity";
import { rejects } from "assert";
import GroupService from "../service/groupService";

describe("it should run tests on all services", () => {
  let fakeGroupRepo: Repository<GroupEntity>;
  let fakeGroupMemberRepo: Repository<GroupMemberEntity>;
  let fakeSchoolRepo: Repository<SchoolEntity>;
  let fakeSubjectRepo: Repository<SubjectEntity>;
  let fakeUserRepo: Repository<UserEntity>;
  let fakeCriteriaRepo: Repository<CriteriaEntity>;

  let groupService: GroupService;
  beforeEach(() => {
    fakeGroupRepo = createMock<Repository<GroupEntity>>();
    fakeGroupMemberRepo = createMock<Repository<GroupMemberEntity>>();
    fakeSchoolRepo = createMock<Repository<SchoolEntity>>();
    fakeSubjectRepo = createMock<Repository<SubjectEntity>>();
    fakeUserRepo = createMock<Repository<UserEntity>>();
    fakeCriteriaRepo = createMock<Repository<CriteriaEntity>>();
    groupService = new GroupService(
      fakeGroupRepo,
      fakeGroupMemberRepo,
      fakeSchoolRepo,
      fakeSubjectRepo,
      fakeUserRepo,
      fakeCriteriaRepo
    );
  });

  // it("Should return array of groups", async () => {
  //   const mockFetchGroups: jest.Mock = On(fakeGroupRepo).get(
  //     method((method) => method.findBy)
  //   );
  //   mockFetchGroups.mockImplementation(async () => groupEntities);
  //   const result = await groupService.fetchAllGroups();
  //   console.log(result);
  //   expect(result.length > 0).toBe(true);
  // });
  //
  // it("Should return group on add", async () => {
  //   const mockAddGroup: jest.Mock = On(fakeGroupRepo).get(
  //     method((method) => method.save)
  //   );
  //   mockAddGroup.mockImplementation(async () => {
  //     return groupEntities[0];
  //   });
  //
  //   const res = await groupService.addGroup(groupInDtos[0], "1");
  //   expect(res.name).toBe(groupInDtos[0].name);
  // });
  //
  // it("Should return group by ID", async () => {
  //   const mockFetchById: jest.Mock = On(fakeGroupRepo).get(
  //     method((method) => method.fetchGroupById)
  //   );
  //   mockFetchById.mockImplementation(async () => groups[0]);
  //   const res = await groupService.fetchGroupById("1");
  //   expect(res.name).toBe(groups[0].name);
  // });
  //
  // it("Should delete a member from a group", async () => {
  //   const mockDeleteMember: jest.Mock = On(fakeGroupRepo).get(
  //     method((method) => method.deleteMember)
  //   );
  //   mockDeleteMember.mockImplementation(async () => groups[0]);
  //   const res = await groupService.deleteMember("1", "2");
  //   expect(res.name).toBe(groups[0].name);
  //   expect(mockDeleteMember).toHaveBeenCalledWith("1", "2");
  // });
  //
  // it("Should add a member", async () => {
  //   const mockAddMember: jest.Mock = On(fakeGroupRepo).get(
  //     method((method) => method.addMember)
  //   );
  //   mockAddMember.mockImplementation(async () => groups[0]);
  //
  //   const res = await groupService.addMember("1", "2");
  //
  //   expect(res.name).toBe(groups[0].name);
  //   expect(mockAddMember).toHaveBeenCalledWith("1", "2");
  // });
  //
  // it("Should return group members", async () => {
  //   const mockFetchMembers: jest.Mock = On(fakeGroupRepo).get(
  //     method((method) => method.fetchGroupMembers)
  //   );
  //   mockFetchMembers.mockImplementation(async () => users);
  //
  //   const res = await groupService.fetchGroupMembers("1");
  //   expect(res.length > 0).toBe(true);
  //   expect(res[0].email).toBe(users[0].email);
  // });
  //
  // it("Should update a group", async () => {
  //   const mockUpdateGroup: jest.Mock = On(fakeGroupRepo).get(
  //     method((method) => method.updateGroup)
  //   );
  //   mockUpdateGroup.mockImplementation(async () => groups[0]);
  //   const res = await groupService.updateGroup(groups[0]);
  //
  //   expect(res.name).toBe(groups[0].name);
  // });
  //
  // it("Should delete a group", async () => {
  //   const mockDeleteGroup: jest.Mock = On(fakeGroupRepo).get(
  //     method((method) => method.deleteGroup)
  //   );
  //   mockDeleteGroup.mockImplementation(async () => true);
  //
  //   const res = await groupService.deleteGroup("1");
  //   expect(res).toBe(true);
  // });
  //
  // it("Should search for a group", async () => {
  //   const searchDto = new SearchDTO(
  //     "Norsk",
  //     "HYBRID",
  //     "W2",
  //     "A",
  //     "8",
  //     ["PG2351"],
  //     "Oslo",
  //     "HK"
  //   );
  //
  //   const mockSearch: jest.Mock = On(fakeGroupRepo).get(
  //     method((method) => method.searchGroup)
  //   );
  //   mockSearch.mockImplementation(async () => groups);
  //
  //   const res = await groupService.searchGroup(searchDto);
  //   expect(Object.keys(res).length > 0).toBe(true);
  // });
});

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
