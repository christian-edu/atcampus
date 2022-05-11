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
            const {group_id} = req?.params;

            if (group_id) {
                try {
                    service.fetchGroupById(group_id);
                } catch (e) {
                    console.error(e);
                    res.status(e.status);
                    res.send(e.message);
                }
                return;
            }

            try {
                res.json(service.fetchAllGroups());
            } catch (e) {
                console.error(e);
                res.status(e.status);
                res.send(e.message);
            }
        });

        router.get("/:id", )
        router.post("/", async(req,res) => {
            const newGroup = {groupname: req.body.groupname, members: ["Only you"]}

            try {
                res.json(service.addGroup(newGroup));
            } catch (e) {
                res.status(e.status);
                res.send(e.method);
            }
        });


        return router;
    }
}