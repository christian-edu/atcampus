import { IGroupService } from "../service/IGroupService";
import express, { Router } from "express";
import { IGroupRepo } from "../repo/IGroupRepo";
import GroupRouter from "../controller/groupRouter";
import supertest, { SuperAgentTest } from "supertest";
import { createMock } from "ts-auto-mock";
import GroupService from "../service/groupService";

const app = express();

describe("Partial integration test for controller & service", () => {
  let groupService: IGroupService;
  let mockGroupRepo: IGroupRepo;
  let groupRouter: GroupRouter;
  let agent: SuperAgentTest;
  let app;

  beforeAll(() => {
    mockGroupRepo = createMock<IGroupRepo>();
    groupService = new GroupService(mockGroupRepo);
    groupRouter = new GroupRouter(groupService, Router());
    app = express();
    agent = supertest.agent(app);
    app.use(express.json());
    app.use("/api/v1/groups", groupRouter.fetchRoutes());
  });
  it("Should throw error without group_id", (done) => {
    agent
      .get("/api/v1/groups/member")
      .expect(400)
      .expect("group_id request parameter must be specified")
      .end((err) => {
        done();
      });
  });
});
