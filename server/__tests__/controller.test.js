import GroupRouter from "../controller/groupRouter.js";
import GroupService from "../service/groupService.js";
import supertest from "supertest";
import express, {Router} from "express";
import {groupNames} from "../mockData";
import HttpException from "../httpException.js";

jest.mock("../service/groupService.js");

describe("Tests for group root paths in controller", () => {
    let mockGroupService = new GroupService();
    let groupRouter = new GroupRouter(mockGroupService, new Router());
    let agent;
    let app;

    beforeAll(() => {
        app = express();
        agent = supertest.agent(app);
        app.use(express.json());
        app.use("/api/v1/groups", groupRouter.fetchRoutes());
    });

    beforeEach(() => {
        GroupService.mockClear();
    });


    it("Should get all groups", async () => {
        jest.spyOn(GroupService.prototype, 'fetchAllGroups')
            .mockImplementation(async () => groupNames);
        const result = await agent.get("/api/v1/groups")
            .expect(200);
        expect(mockGroupService.fetchAllGroups).toHaveBeenCalledTimes(1);
        expect(result.body[0].groupname).toContain("PRO201-G8");
    });

    it("Should respond with error on getting all groups", async () => {
        jest.spyOn(GroupService.prototype, 'fetchAllGroups')
            .mockImplementation(async () => {
                throw new HttpException("Error!", 500)
            });

        await agent.get("/api/v1/groups")
            .expect(500);
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
    it("Should respond with error on getting group by id", async () => {
        jest.spyOn(GroupService.prototype, 'fetchGroupById')
            .mockImplementation(async () => {
                throw new HttpException("Error!", 500)
            });

        await agent.get("/api/v1/groups?group_id=1")
            .expect(500);
    });
    it("Should add a new group", async () => {
        jest.spyOn(GroupService.prototype, 'addGroup')
            .mockImplementation(async () => groupNames[0]);

        const result = await agent
            .post("/api/v1/groups")
            .send({groupname: "PRO201-G8", members: ["Lil J", "Per åge", "Bernt Kåre"]})
            .set('content-type', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200);
        expect(mockGroupService.addGroup).toHaveBeenCalledTimes(1);
        expect(mockGroupService.addGroup).toHaveBeenCalledWith({"groupname": "PRO201-G8", "members": ["Only you"]});
        expect(result.body.groupname).toEqual("PRO201-G8");
    });

    it("Should respond with error on adding group", async () => {
        jest.spyOn(GroupService.prototype, 'addGroup')
            .mockImplementation(async () => {
                throw new HttpException("Error!", 500)
            });

        await agent.post("/api/v1/groups")
            .expect(500);
    });

    it("Should update a group", async () => {
        jest.spyOn(GroupService.prototype, 'updateGroup')
            .mockImplementation(async () => groupNames[0]);

        const result = await agent
            .patch("/api/v1/groups")
            .send({groupname: "PRO201-G8", members: ["Lil J", "Per åge", "Bernt Kåre"]})
            .set('content-type', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200);

        expect(mockGroupService.updateGroup).toHaveBeenCalledTimes(1);
        expect(mockGroupService.updateGroup).toHaveBeenCalledWith({"groupname": "PRO201-G8", "members": ["Only you"]});
    });

    it("Should respond with error when updating group", async () => {
        jest.spyOn(GroupService.prototype, 'updateGroup')
            .mockImplementation(async () => {
                throw new HttpException("Error!", 500)
            });

        await agent.patch("/api/v1/groups")
            .expect(500);
    });

    it("Should delete a group", async () => {
        jest.spyOn(GroupService.prototype, 'deleteGroup')
            .mockImplementation(async () => true);

        const result = await agent
            .delete("/api/v1/groups")
            .send({groupname: "PRO201-G8", members: ["Lil J", "Per åge", "Bernt Kåre"]})
            .set('content-type', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200);

        expect(mockGroupService.deleteGroup).toHaveBeenCalledTimes(1);
        expect(mockGroupService.deleteGroup).toHaveBeenCalledWith({"groupname": "PRO201-G8", "members": ["Only you"]});
    });

    it("Should respond with error when deleting a group", async () => {
        jest.spyOn(GroupService.prototype, 'deleteGroup')
            .mockImplementation(async () => {
                throw new HttpException("Error!", 500)
            });

        await agent.delete("/api/v1/groups")
            .expect(500);
    });
});

describe("Tests for group/member paths in controller", () => {
    let mockGroupService = new GroupService();
    let groupRouter = new GroupRouter(mockGroupService, new Router());
    let agent;
    let app;
    let groups;
    beforeAll(() => {
        app = express();
        agent = supertest.agent(app);
        groups = [...groupNames];

        app.use(express.json());
        app.use("/api/v1/groups", groupRouter.fetchRoutes());
    });

    beforeEach(() => {
        GroupService.mockClear();
    });

    it("Should add a new user to a group", async () => {
        groups[0].members.push("Bugge");
        jest.spyOn(GroupService.prototype, 'addMember')
            .mockImplementation(async () => groups[0]);


        const result = await agent
            .post("/api/v1/groups/member")
            .send({
                group: groups[0],
                user: {
                    username: "Bugge"
                }
            })
            .set('content-type', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200);
        expect(mockGroupService.addMember).toHaveBeenCalledTimes(1);
        console.log(result.body);
        expect(result.body.members).toContain("Bugge");
    })
});