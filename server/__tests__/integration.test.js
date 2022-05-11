import supertest from "supertest";
import express from "express";
import GroupRouter from "../controller/groupRouter.js";
import GroupService from "../service/groupService.js";

const app = express();
const groupService = new GroupService(jest.fn())
const groupRouter = new GroupRouter(groupService, express.Router());

app.use("/api/v1/groups", groupRouter.fetchRoutes());
const agent = supertest.agent(app);


describe("End-to-end testing for backend", () => {

    it("Should throw error without group_id", (done) => {
        agent.get("/api/v1/groups/member")
            .expect(400)
            .expect("group_id request parameter must be specified")
            .end((err) => {
                done();
            });
    });
})