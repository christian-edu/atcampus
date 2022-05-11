import GroupService from "../service/groupService.js";

describe("it should run tests on all services", () => {

    it("Should return array of groups", async () => {
        const groupRepo = jest.fn();
        const groupService = new GroupService(groupRepo);
        const groups = await groupService.fetchAllGroups();
        expect(groups.length > 0).toBe(true)

    });
})