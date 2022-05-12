import { SearchDTO } from "../dto/searchDTO.js";
import { IRouter, Response } from "express";
import { IGroupService } from "../service/IGroupService";
import HttpException from "../httpException";

function sendError(res: Response, e: HttpException) {
  res.status(e.status);
  res.send({ message: e.message });
}

export default class GroupRouter {
  constructor(private groupService: IGroupService, private router: IRouter) {}

  fetchRoutes() {
    const router = this.router;
    const service = this.groupService;

    router.get("/", async (req, res, next) => {
      const { group_id } = req?.query;
      if (group_id) {
        await fetchGroupById(service, group_id, res);
        return;
      }
      await fetchAllGroups(res, service);
    });

    router.post("/", async (req, res) => {
      const newGroup = { groupname: req.body.groupname, members: ["Only you"] };
      try {
        res.json(await service.addGroup(newGroup));
      } catch (e: any) {
        sendError(res, e);
      }
    });

    router.patch("/", async (req, res) => {
      const group = { groupname: req.body.groupname, members: ["Only you"] };
      try {
        res.json(await service.updateGroup(group));
      } catch (e) {
        sendError(res, e);
      }
    });

    router.delete("/", async (req, res) => {
      const group = { groupname: req.body.groupname, members: ["Only you"] };

      try {
        res.json(await service.deleteGroup(group));
      } catch (e: any) {
        sendError(res, e);
      }
    });

    // Member paths
    router.get("/member", async (req, res) => {
      const { group_id } = req?.query;
      try {
        res.json(await service.fetchGroupMembers(group_id));
      } catch (e) {
        sendError(res, e);
      }
    });
    router.delete("/member", async (req, res) => {
      const { group, user } = req?.body;

      try {
        const result = await service.deleteMember(group, user);
        if (result) res.sendStatus(200);
      } catch (e: any) {
        sendError(res, e);
      }
    });

    router.post("/member", async (req, res) => {
      const { group, user } = req?.body;
      console.log(req?.body);
      try {
        res.json(await service.addMember(group, user));
      } catch (e: any) {
        sendError(res, e);
      }
    });

    router.get("/search", async (req, res) => {
      const {
        language,
        workMethod,
        gradeGoal,
        frequency,
        size,
        subject,
        place,
        school,
      } = req.query;

      const searchDto = new SearchDTO(
        language?.toString(),
        workMethod?.toString(),
        gradeGoal?.toString(),
        frequency?.toString(),
        size?.toString(),
        subject?.toString(),
        place?.toString(),
        school?.toString()
      );

      try {
        res.json(await service.searchGroup(searchDto));
      } catch (e: any) {
        sendError(res, e);
      }
    });
    return router;
  }
  private async fetchGroupById(
    service: IGroupService,
    group_id: string,
    res: Response
  ) {
    try {
      res.json(await service.fetchGroupById(group_id));
    } catch (e: any) {
      sendError(res, e);
    }
  }

  private async fetchAllGroups(res: Response, service: IGroupService) {
    try {
      res.json(await service.fetchAllGroups());
    } catch (e: any) {
      sendError(res, e);
    }
  }
}
