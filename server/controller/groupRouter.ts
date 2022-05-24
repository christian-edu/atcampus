import { SearchDTO } from "../dto/searchDTO";
import e, { IRouter, Response } from "express";
import { IGroupService } from "../service/IGroupService";
import HttpException from "../util/httpException";
import { ServerRouter } from "./serverRouter";
import { GroupInDto } from "../dto/GroupInDto";

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
        await this.fetchGroupById(group_id as string, req.userId, res);
        return;
      }
      await this.fetchAllGroups(res, service);
    });

    router.post("/", async (req, res) => {
      const newGroup = this.extractGroupDtoFromRequest(req);
      const admin = req.userId;
      try {
        res.json(await service.addGroup(newGroup, admin));
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

  private static extractGroupDtoFromRequest(req: e.Request) {
    const { uuid, name, criteria, rules, isPrivate } = req.body;

    return new GroupInDto(isPrivate, name, criteria, req.userId, rules, uuid);
  }

  private async fetchGroupById(groupId: string, userId: string, res: Response) {
    try {
      res.json(await this.groupService.fetchGroupById(groupId, userId));
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
