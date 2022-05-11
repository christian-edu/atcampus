import express from "express";
import * as path from "path";
import bodyParser from "body-parser";


const app = express();


app.use(bodyParser.json())


const groupNames = [{groupname: "PRO201-G8", members: ["Lil J", "Per åge", "Bernt Kåre"]},
    {groupname: "TK2100", members: ["Svein Torleif", "Bjertulf sveinson", "Sigurd Knutsen"]},
    {groupname: "Smidig prosjekt", members: ["Per Erling"]},
    {groupname: "Avansert Java", members: ["Dag Marie", "Berntulf Jensen", "Kåre Uleifson"]},
    {groupname: "PG6301 API Design", members: ["Odgunn Bordsann", "Fredvar Komodesen"]}];


const subjectQuestions = [
    {subject: "Arbeidsmiljø og psykologi",
        questions: [{student: "Stresset Student",
            question: "Hei, innleveringen er imorhen, hvor mange ord?",
            timeposted: "3 måneder siden",
            likes: 1,
            answers: [
                {answer: "yes", votes: 10},
                {answer: "no", votes: -10}]}]},
    {
        subject: "TK3210",
        questions: [{student: "Bengt wannabe",
            question: "Hvorfor er skolen så lett å hacke?",
            timeposted: "2 minutter siden",
            likes: 690,
            answers: [
                {answer: "Omg you are so smart", votes: 9},
                {answer: "Why would you even ask that", votes: 87},
                {answer: "Dumbest shit i have ever read", votes: 2}, {answer: "this is another answer", votes: 420}]}]
    }, {
        subject: "Interpretetive dance",
        questions: [{student: "Ulvar gossesen",
            question: "How can i increase my floorrolls (frps) per second when trying to describe a rolling car with 4 wheels?",
            timeposted: "99 months ago",
            likes: 12,
            answers: [
                {answer: "You could try to put fidgetspinners under your feet, that increased my frps by 24", votes: 9999},
                {answer:  "I usually try to dress up as the subject matter, do you have any car costumes?", votes: 777},
                {answer: "If you cant figure this out by yourself, you cant really call yourself an interpretive dancer", votes: -99}]}]
    }
]



app.get("/api/v1/groups", (req, res) => {
    res.json(groupNames)
})


app.post("/api/v1/groups", (req, res) => {
    const newGroup = {groupname: req.body.groupname, members: ["Only you"]}

    groupNames.push(newGroup)
    res.status(200)
})

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