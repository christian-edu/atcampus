import GroupService from "../service/groupService.js";
import {SearchDTO} from "../dto/searchDTO.js";
import express from "express";


function sendError(res, e) {
    res.status(e.status);
    res.send({message: e.message});
}

export default class GroupRouter {
    constructor(groupService, router = new express.Router()) {
        this.service = groupService;
        this.router = router;
    }

    fetchRoutes() {
        const router = this.router;
        const service = this.service;

        router.get("/", async (req, res, next) => {
            const {group_id} = req?.query;
            if (group_id) {
                await fetchGroupById(service, group_id, res);
                return;
            }
            await fetchAllGroups(res, service);
        });

        router.post("/", async (req, res) => {
            const newGroup = {groupname: req.body.groupname, members: ["Only you"]}
            try {
                res.json(await service.addGroup(newGroup));
            } catch (e) {
                sendError(res, e);
            }
        });

        router.patch("/", async (req, res) => {
            const group = {groupname: req.body.groupname, members: ["Only you"]}
            try {
                res.json(await service.updateGroup(group));
            } catch (e) {
                sendError(res, e);
            }
        });

        router.delete("/", async (req, res) => {
            const group = {groupname: req.body.groupname, members: ["Only you"]}

            try {
                res.json(await service.deleteGroup(group));
            } catch (e) {
                sendError(res, e);
            }
        });

        // Member paths
        router.get("/member", async (req, res) => {
            const {group_id} = req?.query;
            try {
                res.json(await service.getGroupMembers(group_id));
            } catch (e) {
                sendError(res, e);
            }
        });
        router.delete("/member", async (req, res) => {
            const {group, user} = req?.body;

            try {
                res.json(await service.deleteMember(group, user));
            } catch (e) {
                sendError(res, e);
            }
        });

        router.post("/member", async (req, res) => {
            const {group, user} = req?.body;
            console.log(req?.body);
            try {
                res.json(await service.addMember(group, user));
            } catch (e) {
                sendError(res, e);
            }
        });

        router.get("/search", async (req, res) => {
            const {language, school, place, workMethod, gradeGoal, frequency} = req?.body;
            const searchDto = new SearchDTO(language, school, place, workMethod, gradeGoal, frequency);

            try {
                res.json(await service.searchGroup(searchDto));
            } catch (e) {
                sendError(res, e);
            }
        })
        return router;
    }
}


async function fetchGroupById(service, group_id, res) {
    try {
        res.json(await service.fetchGroupById(group_id));
    } catch (e) {
        sendError(res, e);
    }
}

async function fetchAllGroups(res, service) {
    try {
        res.json(await service.fetchAllGroups());
    } catch (e) {
        sendError(res, e);
    }
}

