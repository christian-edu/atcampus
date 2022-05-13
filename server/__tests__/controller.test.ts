import GroupRouter from "../controller/groupRouter";
import supertest, { SuperAgentTest } from "supertest";
import express, { Router } from "express";
import { groupMembers, groups, users } from "../mockData";
import HttpException from "../httpException";
import { IGroupService } from "../service/IGroupService";
import { createMock } from "ts-auto-mock";
import { method, On } from "ts-auto-mock/extension";
import { GroupDto } from "../dto/groupDto";
import mock = jest.mock;
import { GroupMemberDto } from "../dto/groupMemberDto";
import { SearchDTO } from "../dto/searchDTO";

describe("Tests for group root paths in controller", () => {
  let mockGroupService: IGroupService;
  let groupRouter: GroupRouter;
  let agent: SuperAgentTest;
  let app;

  beforeAll(() => {
    mockGroupService = createMock<IGroupService>();
    groupRouter = new GroupRouter(mockGroupService, Router());
    app = express();
    agent = supertest.agent(app);
    app.use(express.json());
    app.use("/api/v1/groups", groupRouter.fetchRoutes());
  });

  it("Should get all groups", async () => {
    const mockFetchAllGroups: jest.Mock = On(mockGroupService).get(
      method((mock) => mock.fetchAllGroups)
    );
    mockFetchAllGroups.mockImplementation(async () => JSON.stringify(groups));
    const result = await agent.get("/api/v1/groups").expect(200);
    expect(mockGroupService.fetchAllGroups).toHaveBeenCalledTimes(1);
    console.log((JSON.parse(result.body) as GroupDto[])[0]);
    expect((JSON.parse(result.body) as GroupDto[])[0].name).toContain("Groyp");
  });

  it("Should respond with error on getting all groups", async () => {
    const mockFetchAllGroups: jest.Mock = On(mockGroupService).get(
      method((mock) => mock.fetchAllGroups)
    );
    mockFetchAllGroups.mockImplementation(() => {
      throw new HttpException("Error!", 500);
    });

    await agent.get("/api/v1/groups").expect(500);
  });

  it("Should get a group by ID", async () => {
    const mockFetchGroupById: jest.Mock = On(mockGroupService).get(
      method((mock) => mock.fetchGroupById)
    );
    mockFetchGroupById.mockImplementation(async (id: string) => {
      return groups[0];
    });

    const result = await agent.get("/api/v1/groups?group_id=1").expect(200);
    expect(mockFetchGroupById).toHaveBeenCalledWith("1");
    expect(mockFetchGroupById).toHaveBeenCalledTimes(1);
    expect((result.body as GroupDto).name).toContain("Groyp");
  });

  it("Should respond with error on getting group by id", async () => {
    const mockFetchGroupById: jest.Mock = On(mockGroupService).get(
      method((mock) => mock.fetchGroupById)
    );
    mockFetchGroupById.mockImplementation(async (id: string) => {
      throw new HttpException("Error!", 500);
    });

    await agent.get("/api/v1/groups?group_id=1").expect(500);
  });

  it("Should add a new group", async () => {
    const mockAddGroup: jest.Mock = On(mockGroupService).get(
      method((mock) => mock.addGroup)
    );
    mockAddGroup.mockImplementation(async (group: GroupDto) => groups[0]);

    const result = await agent
      .post("/api/v1/groups")
      .send(groups[0])
      .set("content-type", "application/json")
      .expect("Content-Type", /json/)
      .expect(200);
    expect(mockAddGroup).toHaveBeenCalledTimes(1);
    expect((result.body as GroupDto).name).toEqual("Groyp");
  });

  it("Should respond with error on adding group", async () => {
    const mockAddGroup: jest.Mock = On(mockGroupService).get(
      method((mock) => mock.addGroup)
    );
    mockAddGroup.mockImplementation(async () => {
      throw new HttpException("Error!", 500);
    });
    await agent.post("/api/v1/groups").expect(500);
  });

  it("Should update a group", async () => {
    const mockUpdateGroup: jest.Mock = On(mockGroupService).get(
      method((mock) => mock.updateGroup)
    );
    mockUpdateGroup.mockImplementation(async () => groups[0]);
    await agent
      .patch("/api/v1/groups")
      .send(groups[0])
      .set("content-type", "application/json")
      .expect("Content-Type", /json/)
      .expect(200);

    expect(mockGroupService.updateGroup).toHaveBeenCalledTimes(1);
  });

  it("Should respond with error when updating group", async () => {
    const mockUpdateGroup: jest.Mock = On(mockGroupService).get(
      method((mock) => mock.updateGroup)
    );
    mockUpdateGroup.mockImplementation(async () => {
      throw new HttpException("Error!", 500);
    });

    await agent.patch("/api/v1/groups").expect(500);
  });

  it("Should delete a group", async () => {
    const mockDeleteGroup: jest.Mock = On(mockGroupService).get(
      method((mock) => mock.deleteGroup)
    );
    mockDeleteGroup.mockImplementation(async (id: string) => true);

    const result = await agent
      .delete("/api/v1/groups")
      .send({ groupId: "1" })
      .set("content-type", "application/json")
      .expect("Content-Type", /json/)
      .expect(200);

    expect(mockGroupService.deleteGroup).toHaveBeenCalledTimes(1);
    expect(mockGroupService.deleteGroup).toHaveBeenCalledWith("1");
  });

  it("Should respond with error when deleting a group", async () => {
    const mockDeleteGroup: jest.Mock = On(mockGroupService).get(
      method((mock) => mock.deleteGroup)
    );
    mockDeleteGroup.mockImplementation(async () => {
      throw new HttpException("Error!", 500, "Error message");
    });

    await agent.delete("/api/v1/groups").expect(500);
  });
});

describe("Tests for group/member paths in controller", () => {
  let mockGroupService: IGroupService;
  let groupRouter: GroupRouter;
  let agent: SuperAgentTest;
  let app;

  beforeAll(() => {
    mockGroupService = createMock<IGroupService>();
    groupRouter = new GroupRouter(mockGroupService, Router());
    app = express();
    agent = supertest.agent(app);
    app.use(express.json());
    app.use("/api/v1/groups", groupRouter.fetchRoutes());
  });

  it("Should add a new user to a group", async () => {
    const mockAddMember: jest.Mock = On(mockGroupService).get(
      method((method) => method.addMember)
    );
    mockAddMember.mockImplementation(async () => groups[0]);

    const result = await agent
      .post("/api/v1/groups/member")
      .send(users[0])
      .set("content-type", "application/json")
      .expect("Content-Type", /json/)
      .expect(200);
    expect(mockGroupService.addMember).toHaveBeenCalledTimes(1);
    expect(
      (result.body.groupMember as GroupMemberDto[])[0]?.user.firstName
    ).toContain("Christian");
  });

  it("Should recieve error on adding user", async () => {
    const mockAddMember: jest.Mock = On(mockGroupService).get(
      method((method) => method.addMember)
    );
    mockAddMember.mockImplementation(async () => {
      throw new HttpException("Error!", 500);
    });

    await agent
      .post("/api/v1/groups/member")
      .send({
        group: groups[0],
        user: {
          username: "Bugge",
        },
      })
      .expect(500);
  });

  it("Should get the members of a group", async () => {
    const mockFetchGroupMembers: jest.Mock = On(mockGroupService).get(
      method((method) => method.fetchGroupMembers)
    );
    mockFetchGroupMembers.mockImplementation(async () => groupMembers);

    const result = await agent
      .get("/api/v1/groups/member?group_id=1")
      .expect(200);

    expect(mockGroupService.fetchGroupMembers).toHaveBeenCalledTimes(1);
    expect((result.body as GroupMemberDto[])[0]?.user.firstName).toContain(
      "Christian"
    );
  });

  it("Should recieve error on getting members to group", async () => {
    const mockFetchGroupMembers: jest.Mock = On(mockGroupService).get(
      method((method) => method.fetchGroupMembers)
    );
    mockFetchGroupMembers.mockImplementation(async () => {
      throw new HttpException("Error!", 500);
    });
    await agent.get("/api/v1/groups/member?group_id=1").expect(500);
  });

  it("Should delete a group member", async () => {
    const mockDeleteMemeber: jest.Mock = On(mockGroupService).get(
      method((method) => method.deleteMember)
    );
    mockDeleteMemeber.mockImplementation(async () => true);

    await agent
      .delete("/api/v1/groups/member")
      .send({ groupId: "1", userId: "1" })
      .expect(200);
    expect(mockDeleteMemeber).toHaveBeenCalledWith("1", "1");
  });

  it("Should recieve error when deleting a group member", async () => {
    const mockDeleteMemeber: jest.Mock = On(mockGroupService).get(
      method((method) => method.deleteMember)
    );
    mockDeleteMemeber.mockImplementation(async () => {
      throw new HttpException("Error!", 500);
    });

    await agent.delete("/api/v1/groups/member?group_id=1").expect(500);
  });
});

describe("Search route", () => {
  let mockGroupService: IGroupService;
  let groupRouter: GroupRouter;
  let agent: SuperAgentTest;
  let app;

  beforeAll(() => {
    mockGroupService = createMock<IGroupService>();
    groupRouter = new GroupRouter(mockGroupService, Router());
    app = express();
    agent = supertest.agent(app);
    app.use(express.json());
    app.use("/api/v1/groups", groupRouter.fetchRoutes());
  });

  // it("Should return a search result", async () => {
  //   jest
  //     .spyOn(GroupService.prototype, "searchGroup")
  //     .mockImplementation(async () => true);
  //   //language, school, place, workMethod, gradeGoal, frequency
  //
  //   const params = new URLSearchParams({
  //     language: "norwegian",
  //     school: "HK",
  //     place: "Oslo",
  //     workMethod: "remote",
  //     gradeGoal: "A",
  //     frequency: "2W",
  //   });
  //   await agent
  //     .get(`/api/v1/groups/search?${params.toString()}`)
  //     .send({ group: groupNames[0], user: users[0] })
  //     .expect(200);
  // });

  it("Should recieve error on a search result", async () => {
    const mockSearchGroup: jest.Mock = On(mockGroupService).get(
      method((method) => method.searchGroup)
    );

    mockSearchGroup.mockImplementation(async () => {
      throw new HttpException("Error!", 500);
    });
    const searchDto = new SearchDTO(
      "norsk",
      "REMOTE",
      "A",
      "W1",
      "4",
      ["PGS0M3TH1N6"],
      "Oslo",
      "HK"
    );
    await agent
      .get(`/api/v1/groups/search`)
      .send(JSON.stringify(searchDto))
      .expect(500);
  });
});