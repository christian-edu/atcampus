import express from "express";
import * as path from "path";
import {groupNames, subjectQuestions} from "./mockData.js";
import GroupService from "./service/groupService.js";
import GroupRouter from "./controller/groupRouter.js";


const app = express();
const groupService = new GroupService();
const groupRoutes = new GroupRouter(groupService, express.Router());

app.use(express.json())



app.use("/api/v1/groups", groupRoutes.fetchRoutes());

app.get("/api/questions", (req, res) => {
    console.log("U hit the right spot")

    res.json(subjectQuestions)
})

app.use(express.static("../web/dist"))

app.use((req, res, next) => {
    if(req.method === "GET" && !req.path.startsWith("/api")){
        res.sendFile(path.resolve("../web/dist/index.html"))
    }else{
        next();
    }
})

app.listen(3000, ()=> {
    console.log("Server started at http://localhost:3000")
})