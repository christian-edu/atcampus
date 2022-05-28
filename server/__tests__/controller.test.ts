import GroupRouter from "../controller/groupRouter";
import supertest, { SuperAgentTest } from "supertest";
import express, { Express, Router } from "express";
import {
  groupMemberEntities,
  groupEntitiesWithUsers,
  userEntitiesWithGroups,
} from "../__mocks__/mockData";
import HttpException from "../util/errorUtils";
import { IGroupService } from "../service/IGroupService";
import { createMock } from "ts-auto-mock";
import { method, On } from "ts-auto-mock/extension";
import { GroupDto } from "../dto/groupDto";
import { SearchDTO } from "../dto/searchDTO";
import { Server } from "http";

const TIMEOUT_VALUE = 10 * 1000;

jest.useRealTimers();

describe("Tests for group root paths in controller", () => {
  let mockGroupService: IGroupService;
  let groupRouter: GroupRouter;
  let agent: SuperAgentTest;
  let app;
  // let server: Server | null;

  beforeAll((done) => {
    mockGroupService = createMock<IGroupService>();
    groupRouter = new GroupRouter(mockGroupService, Router());
    app = express();
    ///server?.listen(done);
    agent = supertest.agent(app);
    app.use(express.json());
    app.use("/api/v1/groups", groupRouter.fetchRoutes());
  });

  // afterEach((done) => {
  //   server?.close(done);
  //   server = null;
  //   app = null;
  //   agent = null;
  // });

  it("Should get all groups", async () => {
    jest.setTimeout(TIMEOUT_VALUE);
    const mockFetchAllGroups: jest.Mock = On(mockGroupService).get(
      method((mock) => mock.fetchAllGroups)
    );
    mockFetchAllGroups.mockImplementation(async () =>
      JSON.stringify(groupEntitiesWithUsers())
    );
    const result = await agent?.get("/api/v1/groups").expect(200);
    expect(mockGroupService.fetchAllGroups).toHaveBeenCalledTimes(1);
    console.log((JSON.parse(result?.body) as GroupDto[])[0]);
    expect((JSON.parse(result?.body) as GroupDto[])[0].name).toContain(
      "A group"
    );
  });

  it("Should respond with error on getting all groups", async () => {
    jest.setTimeout(TIMEOUT_VALUE);
    const mockFetchAllGroups: jest.Mock = On(mockGroupService).get(
      method((mock) => mock.fetchAllGroups)
    );
    mockFetchAllGroups.mockImplementation(() => {
      throw new HttpException("Error!", 500);
    });

    await agent?.get("/api/v1/groups").expect(500);
  });

  it("Should get a group by ID", async () => {
    jest.setTimeout(TIMEOUT_VALUE);
    const mockFetchGroupById: jest.Mock = On(mockGroupService).get(
      method((mock) => mock.fetchGroupById)
    );
    mockFetchGroupById.mockImplementation(async () => {
      return groupEntitiesWithUsers()[0];
    });

    const result = await agent?.get("/api/v1/groups/?groupId=1").expect(200);
    expect(mockFetchGroupById).toHaveBeenCalledWith("1");
    expect(mockFetchGroupById).toHaveBeenCalledTimes(1);
    expect((result?.body as GroupDto).name).toContain("A group");
  });

  it("Should respond with error on getting group by id", async () => {
    jest.setTimeout(TIMEOUT_VALUE);
    const mockFetchGroupById: jest.Mock = On(mockGroupService).get(
      method((mock) => mock.fetchGroupById)
    );
    mockFetchGroupById.mockImplementation(async (id: string) => {
      throw new HttpException("Error!", 500);
    });

    await agent?.get("/api/v1/groups?group_id=1").expect(500);
  });

  it("Should add a new group", async () => {
    jest.setTimeout(TIMEOUT_VALUE);
    const mockAddGroup: jest.Mock = On(mockGroupService).get(
      method((mock) => mock.addGroup)
    );
    mockAddGroup.mockImplementation(
      async (group: GroupDto) => groupEntitiesWithUsers()[0]
    );

    if (agent) {
      const result = await agent
        .post("/api/v1/groups")
        .set("content-type", "application/json")
        .send(groupEntitiesWithUsers()[0])
        .expect("Content-Type", /json/)
        .expect(200);
      expect(mockAddGroup).toHaveBeenCalledTimes(1);
      expect((result.body as GroupDto).name).toEqual("A group");
    } else {
      expect(true).toBe(false);
    }
  });

  it("Should respond with error on adding group", async () => {
    jest.setTimeout(TIMEOUT_VALUE);
    const mockAddGroup: jest.Mock = On(mockGroupService).get(
      method((mock) => mock.addGroup)
    );
    mockAddGroup.mockImplementation(async () => {
      throw new HttpException("Error!", 500);
    });
    await agent?.post("/api/v1/groups").expect(500);
  });

  it("Should update a group", async () => {
    jest.setTimeout(TIMEOUT_VALUE);
    const mockUpdateGroup: jest.Mock = On(mockGroupService).get(
      method((mock) => mock.updateGroup)
    );
    mockUpdateGroup.mockImplementation(async () => groupEntitiesWithUsers()[0]);
    if (agent)
      await agent
        .patch("/api/v1/groups")
        .set("content-type", "application/json")
        .send(groupEntitiesWithUsers()[0])
        .expect("Content-Type", /json/)
        .expect(200);

    expect(mockGroupService.updateGroup).toHaveBeenCalledTimes(1);
  });

  it("Should respond with error when updating group", async () => {
    jest.setTimeout(TIMEOUT_VALUE);
    const mockUpdateGroup: jest.Mock = On(mockGroupService).get(
      method((mock) => mock.updateGroup)
    );
    mockUpdateGroup.mockImplementation(async () => {
      throw new HttpException("Error!", 500);
    });

    await agent?.patch("/api/v1/groups").expect(500);
  });

  it("Should delete a group", async () => {
    jest.setTimeout(TIMEOUT_VALUE);
    const mockDeleteGroup: jest.Mock = On(mockGroupService).get(
      method((mock) => mock.deleteGroup)
    );
    mockDeleteGroup.mockImplementation(async (id: string) => true);

    if (agent)
      await agent
        .delete("/api/v1/groups")
        .send({ groupId: "1" })
        .set("content-type", "application/json")
        .expect("Content-Type", /json/)
        .expect(200);

    expect(mockGroupService.deleteGroup).toHaveBeenCalledTimes(1);
    expect(mockGroupService.deleteGroup).toHaveBeenCalledWith("1");
  });

  it("Should respond with error when deleting a group", async () => {
    jest.setTimeout(TIMEOUT_VALUE);
    const mockDeleteGroup: jest.Mock = On(mockGroupService).get(
      method((mock) => mock.deleteGroup)
    );
    mockDeleteGroup.mockImplementation(async () => {
      throw new HttpException("Error!", 500, "Error message");
    });

    await agent?.delete("/api/v1/groups").expect(500);
  });
});

describe("Tests for group/member paths in controller", () => {
  let mockGroupService: IGroupService;
  let groupRouter: GroupRouter;
  let agent: SuperAgentTest | null;
  let app: Express | null;
  let server: Server | null;
  beforeEach((done) => {
    mockGroupService = createMock<IGroupService>();
    groupRouter = new GroupRouter(mockGroupService, Router());
    app = express();
    server = app.listen(done);
    agent = supertest.agent(app);
    app.use(express.json());
    app.use("/api/v1/groups", groupRouter.fetchRoutes());
  });

  afterEach((done) => {
    server?.close(done);
    server = null;
    app = null;
    agent = null;
  });

  it("Should add a new user to a group", async () => {
    jest.setTimeout(TIMEOUT_VALUE);
    const mockAddMember: jest.Mock = On(mockGroupService).get(
      method((method) => method.addMember)
    );
    mockAddMember.mockImplementation(async () => groupEntitiesWithUsers()[0]);

    // TODO: fix return of mock implementation

    const result = await agent
      ?.post("/api/v1/groups/member")
      .send(userEntitiesWithGroups()[0])
      .set("content-type", "application/json")
      .expect("Content-Type", /json/)
      .expect(200);
    expect(mockGroupService.addMember).toHaveBeenCalledTimes(1);
    // expect(
    //   (result?.body.groupMember as GroupMemberDtoBoth[])[0]?.user_name
    // ).toContain("jimbob");
  });

  it("Should recieve error on adding user", async () => {
    jest.setTimeout(TIMEOUT_VALUE);
    const mockAddMember: jest.Mock = On(mockGroupService).get(
      method((method) => method.addMember)
    );
    mockAddMember.mockImplementation(async () => {
      throw new HttpException("Error!", 500);
    });

    await agent
      ?.post("/api/v1/groups/member")
      .send({
        group: groupEntitiesWithUsers()[0],
        user: {
          username: "Bugge",
        },
      })
      .expect(500);
  });

  it("Should get the members of a group", async () => {
    jest.setTimeout(TIMEOUT_VALUE);
    const mockFetchGroupMembers: jest.Mock = On(mockGroupService).get(
      method((method) => method.fetchGroupMembers)
    );
    mockFetchGroupMembers.mockImplementation(async () => groupMemberEntities());

    // TODO: fix return of mock implementation

    const result = await agent
      ?.get("/api/v1/groups/member?groupId=1")
      .expect(200);

    expect(mockGroupService.fetchGroupMembers).toHaveBeenCalledTimes(1);
    // expect((result?.body as GroupMemberDtoBoth[])[0]?.user_name).toContain(
    //   "jimbob"
    // );
  });

  it("Should recieve error on getting members to group", async () => {
    jest.setTimeout(TIMEOUT_VALUE);
    const mockFetchGroupMembers: jest.Mock = On(mockGroupService).get(
      method((method) => method.fetchGroupMembers)
    );
    mockFetchGroupMembers.mockImplementation(async () => {
      throw new HttpException("Error!", 500);
    });
    await agent?.get("/api/v1/groups/member?groupId=1").expect(500);
  });

  it("Should delete a group member", async () => {
    jest.setTimeout(TIMEOUT_VALUE);
    const mockDeleteMemeber: jest.Mock = On(mockGroupService).get(
      method((method) => method.deleteMember)
    );
    mockDeleteMemeber.mockImplementation(async () => true);

    await agent
      ?.delete("/api/v1/groups/member")
      .send({ groupId: "1", userId: "1" })
      .expect(200);
    expect(mockDeleteMemeber).toHaveBeenCalledWith("1", "1");
  });

  it("Should recieve error when deleting a group member", async () => {
    jest.setTimeout(TIMEOUT_VALUE);
    const mockDeleteMemeber: jest.Mock = On(mockGroupService).get(
      method((method) => method.deleteMember)
    );
    mockDeleteMemeber.mockImplementation(async () => {
      throw new HttpException("Error!", 500);
    });

    await agent?.delete("/api/v1/groups/member?group_id=1").expect(500);
  });
});

describe("Search route", () => {
  let mockGroupService: IGroupService;
  let groupRouter: GroupRouter;
  let agent: SuperAgentTest | null;
  let app: Express | null;
  let server: Server | null;
  beforeEach((done) => {
    mockGroupService = createMock<IGroupService>();
    groupRouter = new GroupRouter(mockGroupService, Router());
    app = express();
    server = app.listen(done);
    agent = supertest.agent(app);
    app.use(express.json());
    app.use("/api/v1/groups", groupRouter.fetchRoutes());
  });

  afterEach((done) => {
    server?.close(done);
    server = null;
    app = null;
    agent = null;
  });
  it("Should return a search result", async () => {
    jest.setTimeout(TIMEOUT_VALUE);
    const searchDto = new SearchDTO(
      "Norsk",
      "HYBRID",
      "W2",
      "A",
      "8",
      ["PG2351"],
      "Oslo",
      "HK"
    );

    const mockSearch: jest.Mock = On(mockGroupService).get(
      method((method) => method.searchGroup)
    );
    mockSearch.mockImplementation(async () => groupEntitiesWithUsers());

    const res = await agent
      ?.post(`/api/v1/groups/search`)
      .send(searchDto)
      .expect(200);

    if (res) expect(Object.keys(res!).length > 0).toBe(true);
  });

  it("Should recieve error on a search result", async () => {
    jest.setTimeout(TIMEOUT_VALUE);
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
      ?.post(`/api/v1/groups/search`)
      .send(JSON.stringify(searchDto))
      .expect(500);
  });
});
