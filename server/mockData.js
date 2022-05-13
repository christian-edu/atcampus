import {SearchDTO} from "./dto/searchDTO.js";

export const users = [
    {username: "Hansemann"},
    {username: "Lemmy"}
]

export const groups = [
    new SearchDTO("norwegian", "remote", "A", "2W", 5, "PG2308", "Oslo", "HK", 1),
    new SearchDTO("norwegian", "physical", "B", "1W", 3, "PG2302", "Oslo", "HK", 2),
    new SearchDTO("norwegian", "remote", "A", "2W", 3, "PG2303", "Oslo", "HK", 3),
    new SearchDTO("norwegian", "physical", "C", "2M", 5, "PG2308", "Oslo", "HK", 4)
]

export const groupNames = [{groupname: "PRO201-G8", members: ["Lil J", "Per åge", "Bernt Kåre"]},
    {groupname: "TK2100", members: ["Svein Torleif", "Bjertulf sveinson", "Sigurd Knutsen"]},
    {groupname: "Smidig prosjekt", members: ["Per Erling"]},
    {groupname: "Avansert Java", members: ["Dag Marie", "Berntulf Jensen", "Kåre Uleifson"]},
    {groupname: "PG6301 API Design", members: ["Odgunn Bordsann", "Fredvar Komodesen"]}];
export const subjectQuestions = [
    {
        subject: "Arbeidsmiljø og psykologi",
        questions: [{
            student: "Stresset Student",
            question: "Hei, innleveringen er imorhen, hvor mange ord?",
            timeposted: "3 måneder siden",
            likes: 1,
            answers: [
                {answer: "yes", votes: 10},
                {answer: "no", votes: -10}]
        }]
    },
    {
        subject: "TK3210",
        questions: [{
            student: "Bengt wannabe",
            question: "Hvorfor er skolen så lett å hacke?",
            timeposted: "2 minutter siden",
            likes: 690,
            answers: [
                {answer: "Omg you are so smart", votes: 9},
                {answer: "Why would you even ask that", votes: 87},
                {answer: "Dumbest shit i have ever read", votes: 2}, {answer: "this is another answer", votes: 420}]
        }]
    }, {
        subject: "Interpretetive dance",
        questions: [{
            student: "Ulvar gossesen",
            question: "How can i increase my floorrolls (frps) per second when trying to describe a rolling car with 4 wheels?",
            timeposted: "99 months ago",
            likes: 12,
            answers: [
                {
                    answer: "You could try to put fidgetspinners under your feet, that increased my frps by 24",
                    votes: 9999
                },
                {answer: "I usually try to dress up as the subject matter, do you have any car costumes?", votes: 777},
                {
                    answer: "If you cant figure this out by yourself, you cant really call yourself an interpretive dancer",
                    votes: -99
                }]
        }]
    }
]

   export const groupSearchResults =  [{groupname: "group match 1", members: ["Per åge", "Ole kristiansen"]}, {groupname: "group match 2",  members: ["Svein", "Per persen", "Ole paus"]}, {groupname: "matching group 3", members: ["Per åge"]}, {groupname: "matching group 4",  members: ["Pål Pålsen", "Ole kristiansen"]}, {groupname: "group 5",  members: ["Per åge", "Ole kristiansen"]}, {groupname: "group 6",  members: ["Per åge", "Ole kristiansen"]}, {groupname: "group 7",  members: ["Per åge", "Ole kristiansen"]}]