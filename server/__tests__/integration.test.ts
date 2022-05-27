// import { IGroupService } from "../service/IGroupService";
// import express, { Router } from "express";
// import GroupRouter from "../controller/groupRouter";
// import supertest, { SuperAgentTest } from "supertest";
// import { createMock } from "ts-auto-mock";
// import GroupService from "../service/groupService";
// import { GroupEntity } from "../entity/GroupEntity";
// import { Repository } from "typeorm";
//
// const app = express();
//
// describe("Partial integration test for controller & service", () => {
//   let groupService: IGroupService;
//   let mockGroupRepo: Repository<GroupEntity>;
//   let groupRouter: GroupRouter;
//   let agent: SuperAgentTest;
//   let app;
//
//   beforeAll(() => {
//     mockGroupRepo = createMock<Repository<GroupEntity>>();
//     groupService = new GroupService(mockGroupRepo);
//     groupRouter = new GroupRouter(groupService, Router());
//     app = express();
//     agent = supertest.agent(app);
//     app.use(express.json());
//     app.use("/api/v1/groups", groupRouter.fetchRoutes());
//   });
//   it("Should throw error without group_id", (done) => {
//     agent
//       .get("/api/v1/groups/member")
//       .expect(400)
//       .expect("group_id request parameter must be specified")
//       .end((err) => {
//         done();
//       });
//   });
// });
