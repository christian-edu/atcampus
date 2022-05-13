import GroupService from "../service/groupService.js";
import {SearchDTO} from "../dto/searchDTO.js";
import express from "express";
import {groupSearchResults} from "../mockData.js";


function sendError(res, e) {
    res.status(e.status);
    res.send({message: e.message});
}

export default class GroupRouter {
    constructor(groupService = new GroupService(), router = new express.Router()) {
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
                res.json(await service.fetchGroupMembers(group_id));
            } catch (e) {
                sendError(res, e);
            }
        });
        router.delete("/member", async (req, res) => {
            const {group, user} = req?.body;

            try {
                const result = await service.deleteMember(group, user)
                if (result) res.sendStatus(200);
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

        router.post("/search", async (req, res) => {


            const {language, workMethod, gradeGoal, frequency, size, subject, place, school} = req.body;

            const searchDto = new SearchDTO(language,workMethod,gradeGoal,frequency, size, subject,place, school);


            console.log("Here are your search criterias: ")
            console.log({language, workMethod, gradeGoal, frequency, size, subject, place, school})



            try {
                /*res.json(await service.searchGroup(searchDto));*/
                // Dummy data response
                res.json(groupSearchResults)

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

