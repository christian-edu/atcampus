import GroupService from "../service/groupService.js";


export default class GroupRouter {
    constructor(groupService = new GroupService(), router = new Express.Router()) {
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

        router.post("/", async(req,res) => {
            const newGroup = {groupname: req.body.groupname, members: ["Only you"]}

            try {
                res.json(await service.addGroup(newGroup));
            } catch (e) {
                res.status(e.status);
                res.send({message: e.message});
            }
        });

        // Member paths
        router.get("/member", async (req, res) => {
            const {group_id} = req?.query;
            try {
                await service.getGroupMembers(group_id);
            } catch (e) {
                res.status(e.status);
                res.send({message: e.message});
            }
        });
        router.delete("/member", async (req, res) => {
            const {group, user} = req?.body;

            try {
                await service.deleteMember(group, user);
            } catch (e) {
                res.status(e.status);
                res.send({message: e.message});
            }
        });

        router.post("/member", async (req, res) => {
            const {group, user} = req?.body;
            try {
                await service.addMember(group, user);
            } catch (e) {
                res.status(e.status);
                res.send({message: e.message});
            }
        });
        return router;
    }
}


async function fetchGroupById(service, group_id, res) {
    try {
        res.json(await service.fetchGroupById(group_id));
    } catch (e) {
        console.error(e);
        res.status(e.status);
        res.send({message: e.message});
    }
}

async function fetchAllGroups(res, service) {
    try {
        res.json(await service.fetchAllGroups());
    } catch (e) {
        console.error(e);
        res.status(e.status);
        res.send({message: e.message});
    }
}

