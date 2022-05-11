import GroupRouter from "../controller/groupRouter.js";
import GroupService from "../service/groupService.js";
import supertest from "supertest";
import express, {Router} from "express";
import {groupNames} from "../mockData";
jest.mock("../service/groupService.js");

describe("Tests for all controllers", () => {
    let mockGroupService = new GroupService();
    let groupRouter = new GroupRouter(mockGroupService, new Router());
    let agent;
    let app;

    beforeAll(() => {
        app = express();
        agent = supertest.agent(app);
        app.use("/api/v1/groups", groupRouter.fetchRoutes());
        app.use(express.json());
    });

    beforeEach(() => {
        GroupService.mockClear();
    });

    afterEach(() => {
        // mockGroupService.clearAllMocks();
        // mockGroupRepo.clearAllMocks();
    });

    it("Should get all groups", async () => {
        jest.spyOn(GroupService.prototype, 'fetchAllGroups')
            .mockImplementation(async () => groupNames);
        const result = await agent.get("/api/v1/groups")
            .expect(200);
        expect(mockGroupService.fetchAllGroups).toHaveBeenCalledTimes(1);
        expect(result.body[0].groupname).toContain("PRO201-G8");
    });

    it("Should get a group by ID", async () => {
        jest.spyOn(GroupService.prototype, 'fetchGroupById')
            .mockImplementation(async () => groupNames[0]);

        const result = await agent.get("/api/v1/groups?group_id=1")
            .expect(200);
        expect(mockGroupService.fetchGroupById).toHaveBeenCalledWith("1");
        expect(mockGroupService.fetchGroupById).toHaveBeenCalledTimes(1);
        expect(result.body.groupname).toContain("PRO201-G8");
    });
})