import { IGroupService } from "../service/IGroupService";
import express, { Router } from "express";
import GroupRouter from "../controller/groupRouter";
import supertest, { SuperAgentTest } from "supertest";
import { createMock } from "ts-auto-mock";
import GroupService from "../service/groupService";
import { GroupEntity } from "../entity/GroupEntity";
import { Repository } from "typeorm";
import { GroupMemberEntity } from "../entity/GroupMemberEntity";
import { SchoolEntity } from "../entity/SchoolEntity";
import { SubjectEntity } from "../entity/SubjectEntity";
import { UserEntity } from "../entity/UserEntity";
import { CriteriaEntity } from "../entity/CriteriaEntity";

const app = express();

describe("Partial integration test for controller & service", () => {
  let groupRouter: GroupRouter;
  let fakeGroupRepo: Repository<GroupEntity>;
  let fakeGroupMemberRepo: Repository<GroupMemberEntity>;
  let fakeSchoolRepo: Repository<SchoolEntity>;
  let fakeSubjectRepo: Repository<SubjectEntity>;
  let fakeUserRepo: Repository<UserEntity>;
  let fakeCriteriaRepo: Repository<CriteriaEntity>;
  let groupService: GroupService;
  let agent: SuperAgentTest;
  let app;

  beforeAll(() => {
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
