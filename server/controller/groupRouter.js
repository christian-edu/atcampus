import GroupService from "../service/groupService.js";

export default class GroupRouter {
    constructor(groupService = new GroupService(), router = new Express.Router()) {
        this.service = groupService;
        this.router = router;
    }

    fetchRoutes() {
        const router = this.router;
        const service = this.service;
        router.get("/", async (req, res) => {
            try {
                res.json(service.fetchAllGroups());
            } catch (e) {
                console.error(e);
                console.Console
                res.status(e.status);
                res.send(e.message);
            }
        });

        router.post("/", async(req,res) => {
            const {group} = req?.body

            try {
                res.json(service.addGroup(group));
            } catch (e) {

            }
        });

        return router;
    }
}