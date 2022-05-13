import GroupService from "../service/groupService.js";
import { IGroupRepo } from "../repo/IGroupRepo";
import { createMock } from "ts-auto-mock";

describe("it should run tests on all services", () => {
  let fakeGroupRepo: IGroupRepo;

  beforeEach(() => {
    fakeGroupRepo = createMock<IGroupRepo>();
  });

  it("Should return array of groups", async () => {
    const groupService = new GroupService(fakeGroupRepo);
    const groups = await groupService.fetchAllGroups();
    expect(groups.length > 0).toBe(true);
  });
});
