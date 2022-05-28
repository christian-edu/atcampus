import e, { IRouter, Response } from "express";
import { IGroupService } from "../service/IGroupService";
import { ServerRouter } from "./serverRouter";
import { GroupInDto } from "../dto/GroupInOutDto";
import { CriteriaDto } from "../dto/criteriaDto";
import HttpException from "../util/errorUtils";
import Logger from "../util/logger";

export default class GroupRouter extends ServerRouter {
  constructor(private groupService: IGroupService, private router: IRouter) {
    super();
  }

  public fetchRoutes() {
    const router = this.router;
    const service = this.groupService;
    router.get("/", async (req, res, next) => {
      const { groupId } = req?.query;
      if (groupId) {
        await this.fetchGroupById(groupId as string, res);
        return;
      }
      await this.fetchAllGroups(res, service);
    });

    router.post("/", async (req, res) => {
      Logger.debug("group_router", "Creating group");
      //console.log(req.body);
      const newGroup = GroupRouter.extractGroupDtoFromRequest(req);
      //console.log(newGroup);
      const admin = req.userId;
      try {
        res.json(await service.addGroup(newGroup, admin));
      } catch (e: unknown) {
        this.sendError(res, e);
      }
    });

    router.patch("/", async (req, res) => {
      const group = GroupRouter.extractGroupDtoFromRequest(req);
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
        this.sendError(res, e as HttpException);
      }
    });

    // Member paths
    router.get("/member", async (req, res) => {
      const { groupId } = req?.query;
      try {
        res.json(await service.fetchGroupMembers(groupId as string));
      } catch (e: unknown) {
        this.sendError(res, e);
      }
    });
    router.delete("/member", async (req, res) => {
      const { groupId, userId } = req?.body;

      try {
        const result = await service.deleteMember(groupId, userId);
        if (result) res.sendStatus(200);
      } catch (e: unknown) {
        this.sendError(res, e);
      }
    });

    router.post("/member", async (req, res) => {
      const { groupId, userId } = req?.body;
      try {
        res.json(await service.addMember(groupId, userId));
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

      return new CriteriaDto(
        gradeGoal?.toString(),
        frequency?.toString(),
        language?.toString(),
        size?.toString(),
        place?.toString(),
        subject as string[],
        workMethod?.toString(),
        school?.toString()
      );
    }

    router.post("/search", async (req, res) => {
      const searchDto = extractSearchDtoFromRequest(req);
      Logger.info("SEARCH", "In correct router");
      try {
        res.json(await service.searchGroup(searchDto));
      } catch (e: unknown) {
        this.sendError(res, e);
      }
    });
    return router;
  }

  private static extractGroupDtoFromRequest(req: e.Request) {
    const {
      gradeGoal,
      language,
      place,
      size,
      school,
      subject,
      workFrequency,
      workType,
      isPrivate,
      uuid,
      groupName,
      rules,
    } = req.body;

    const criteriaDto = new CriteriaDto(
      gradeGoal,
      workFrequency,
      language,
      size,
      place,
      subject?.map((s: { subject: string }) => s.subject),
      workType,
      school,
      uuid
    );
    const groupDto = new GroupInDto(
      isPrivate,
      groupName,
      criteriaDto,
      rules,
      uuid
    );
    return groupDto;
  }

  private async fetchGroupById(groupId: string, res: Response) {
    try {
      return res.json(await this.groupService.fetchGroupById(groupId));
    } catch (e: unknown) {
      this.sendError(res, e);
    }
  }

  private async fetchAllGroups(res: Response, service: IGroupService) {
    try {
      res.json(await service.fetchAllGroups());
    } catch (e: unknown) {
      this.sendError(res, e);
    }
  }
}
