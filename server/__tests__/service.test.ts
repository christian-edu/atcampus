import GroupService from "../service/groupService";
import { IGroupRepo } from "../repo/IGroupRepo";
import { createMock } from "ts-auto-mock";
import { method, On } from "ts-auto-mock/extension";
import { groups } from "../__mocks__/mockData";
import { IGroupService } from "../service/IGroupService";

describe("it should run tests on all services", () => {
  let fakeGroupRepo: IGroupRepo;
  let groupService: IGroupService;
  beforeEach(() => {
    fakeGroupRepo = createMock<IGroupRepo>();
    groupService = new GroupService(fakeGroupRepo);
  });

  it("Should return array of groups", async () => {
    const mockFetchGroups: jest.Mock = On(fakeGroupRepo).get(
      method((method) => method.fetchAllGroups)
    );
    mockFetchGroups.mockImplementation(async () => groups);
    const result = await groupService.fetchAllGroups();
    expect(result.length > 0).toBe(true);
  });
});
