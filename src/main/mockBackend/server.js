import express from "express";
import * as path from "path";


const app = express();

const groupNames = [{groupname: "PRO201-G8", members: ["Lil J", "Per åge", "Bernt Kåre"]},
    {groupname: "TK2100", members: ["Svein Torleif", "Bjertulf sveinson", "Sigurd Knutsen"]},
    {groupname: "Smidig prosjekt", members: ["Per Erling"]},
    {groupname: "Avansert Java", members: ["Dag Marie", "Berntulf Jensen", "Kåre Uleifson"]},
    {groupname: "PG6301 API Design", members: ["Odgunn Bordsann", "Fredvar Komodesen"]}];


app.get("/api/v1/groups", (req, res) => {
    res.json(groupNames)
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