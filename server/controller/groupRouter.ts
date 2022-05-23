import { SearchDTO } from "../dto/searchDTO";
import e, { IRouter, Response } from "express";
import { IGroupService } from "../service/IGroupService";
import HttpException from "../util/httpException";
import { GroupDto } from "../dto/groupDto";
import { ServerRouter } from "./serverRouter";

export default class GroupRouter extends ServerRouter {
  constructor(private groupService: IGroupService, private router: IRouter) {
    super();
  }

  public fetchRoutes() {
    const router = this.router;
    const service = this.groupService;
    router.get("/", async (req, res, next) => {
      const { group_id } = req?.query;
      if (group_id) {
        await this.fetchGroupById(service, group_id as string, res);
        return;
      }
      await this.fetchAllGroups(res, service);
    });

    router.post("/", async (req, res) => {
      const newGroup = this.extractGroupDtoFromRequest(req);
      try {
        res.json(await service.addGroup(newGroup));
      } catch (e: unknown) {
        this.sendError(res, e);
      }
    });

    router.patch("/", async (req, res) => {



      const group = this.extractGroupDtoFromRequest(req);

      try {
        res.json(await service.updateGroup(group));
      } catch (e: unknown) {
        this.sendError(res, e);
      }
    });

    router.delete("/", async (req, res) => {
      const { groupId } = req.body;

      this.extractGroupDtoFromRequest(req);

      try {
        res.json(await service.deleteGroup(groupId));
      } catch (e: unknown) {
        console.log(e);
        this.sendError(res, e as HttpException);
      }
    });

    // Member paths
    router.get("/member", async (req, res) => {
      const { group_id } = req?.query;
      try {
        res.json(await service.fetchGroupMembers(group_id as string));
      } catch (e: unknown) {
        this.sendError(res, e);
      }
    });
    router.delete("/member", async (req, res) => {
      const { groupId, userId } = req?.body;

      try {
        const result = await service.deleteMember(userId, groupId);
        if (result) res.sendStatus(200);
      } catch (e: unknown) {
        this.sendError(res, e);
      }
    });

    router.post("/member", async (req, res) => {
      const { group, user } = req?.body;
      console.log(req?.body);
      try {
        res.json(await service.addMember(group, user));
      } catch (e: unknown) {
        this.sendError(res, e);
      }
    });

    function extractSearchDtoFromRequest(req: e.Request) {
      const {
        language,
        workMethod,
        gradeGoal,
        frequency,
        size,
        subject,
        place,
        school,
      } = req.body;

      const searchDto = new SearchDTO(
        language?.toString(),
        workMethod?.toString(),
        gradeGoal?.toString(),
        frequency?.toString(),
        size?.toString(),
        subject as string[],
        place?.toString(),
        school?.toString()
      );
      return searchDto;
    }

    router.post("/search", async (req, res) => {
      const searchDto = extractSearchDtoFromRequest(req);

      try {
        res.json(await service.searchGroup(searchDto));
      } catch (e: unknown) {
        this.sendError(res, e);
      }
    });
    return router;
  }

  private extractGroupDtoFromRequest(req: e.Request) {
    const { uuid, name, criteria, rules, groupMember, isPrivate } = req.body;

    return new GroupDto(isPrivate, name, rules, criteria, uuid, groupMember);
  }
  private async fetchGroupById(
    service: IGroupService,
    group_id: string,
    res: Response
  ) {
    try {
      res.json(await service.fetchGroupById(group_id));
    } catch (e: unknown) {
      this.sendError(res, e);
    }
  }

  private async fetchAllGroups(res: Response, service: IGroupService) {
    try {
      res.json(await service.fetchAllGroups());
    } catch (e: unknown) {
      console.log(e);
      this.sendError(res, e);
    }
  }
}
