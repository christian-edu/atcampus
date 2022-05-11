import React, {useState} from "react"
import ReactDOM from "react-dom";
import {BrowserRouter, Link, Route, Routes, useLocation, useNavigate} from "react-router-dom";
import {useLoader} from "./useLoader.jsx";
import {fetchJSON} from "./fetchJSON.jsx";


function GroupLinks() {

    // Should get the data for the group names you are a part of

    const navigate = useNavigate();

    const {data, error, loading} = useLoader(() => fetchJSON("/api/v1/groups"))

    if(loading){
        return <div>Loading...</div>
    }

    if(error){
        return <div>
            <h2>Error</h2>
            <h3>{error}</h3>
        </div>
    }

    return <div>
        <TopNavBar/>
        <div><Link to={"/createGroup"}>Opprett gruppe</Link></div>
        <div><Link to={"/searchGroup"}>Søk etter gruppe</Link></div>
        <div>
            <h2>Mine grupper</h2>
            {data.map((group) => (
                <div>
                    <div key={group.groupname}>
                        <button onClick={() =>  navigate("/group/specific", {state: {group}})}>{group.groupname}</button>
                    </div>
                </div>
            ) )}
            <Footer/>
        </div>
        <BottomNavBar/>
    </div>;
}

function Footer(){

    // Linke til atcampus sider??


    return <div>
        <h2>atCampus</h2>
        <h3>Get unstuck</h3>
        <div>
            <ul>
                <li>Regler</li>
                <li>Bruksvilkår</li>
                <li>Salgsvilkår</li>
                <li>Personvernsærklæring</li>
                <li>Om atcampus</li>
                <li>Gi tilbakemelding</li>
                <li>Ledige stillinger</li>
            </ul>
        </div>
    </div>
}

function SearchGroup() {

    return <div>
        <TopNavBar/>
        <h2>Søk etter gruppenavn</h2>
        <h4>Trykk på en gruppe for å sende forespørsel</h4>
        <input type="text"/>
        <div><h2>Søk etter gruppekriterier</h2>
        <h4>Velg kriterier for søket</h4>
            <div>
                <div>
                    <select name="emne">
                        <option value="Programmering">Programmering</option>
                        <option value="Frontend">Frontend</option>
                        <option value="InteraktivtDesign">InteraktivtDesign</option>
                    </select>
                </div>
                <div>
                    <select name="størrelse">
                        <option value="liten">Liten (1-4stk)</option>
                        <option value="Medium">Liten (5-7stk)</option>
                        <option value="Stor">Stor (8+)</option>
                    </select>
                </div>
            </div>
            <div>
                <select name="karaktermål">
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                    <option value="D">D</option>
                    <option value="E">E</option>
                    <option value="F">F</option>
                </select>
            </div>
            <div>
                <select name="arbeidsfrekvens">
                    <option value="Månedlig">Månedlig</option>
                    <option value="Ukentlig">Ukentlig</option>
                </select>
            </div>
            <div>
                <input type="radio" name={"metode"} id={"fysisk"}/>
                <label htmlFor="fysisk">Fysisk</label>
                <input type="radio" name={"metode"} id={"digitalt"}/>
                <label htmlFor="digitalt">Digitalt</label>
                <input type="radio" name={"metode"} id={"begge"}/>
                <label htmlFor="begge">Begge</label>
            </div>
            <button>Vis resultater</button>

        </div>
        <Footer/>
        <BottomNavBar/>
    </div>;
}

function CreateGroup() {

    const [groupname, setGroupName] = useState("");
    const [error, setError] = useState();

    const navigate = useNavigate();

    async function handleSubmit(e){
        e.preventDefault()



        if(groupname.length === 0){
            alert("Please fill in a group name")
        }else {

            const res = await fetch("/api/v1/groups", {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({groupname})
            })


            if(!res.ok){
                setError("Failed to create the group, Error: " + res.status )

            }else {
                navigate("/")
            }
        }
    }


    if(error){
        return <div>
            <h2>Error: </h2>
            <h4>{error}</h4>
            <BottomNavBar/>
        </div>
    }



    return <div>
        <TopNavBar/>
        <h2>Opprett gruppe</h2>
        <form onSubmit={handleSubmit} >
            <label>Gruppenavn: <input type="text" value={groupname} onChange={e => setGroupName(e.target.value)}/></label>
            <button>Opprett gruppe</button>
        </form>
        <BottomNavBar/>
    </div>;
}

function ShowMyGroup() {
    const location = useLocation()

    const navigate = useNavigate()
    const group = location.state.group

    return <div>
        <TopNavBar/>
        <h2>{group.groupname}</h2>
        <h2>Chat</h2>
        <h2>Møtekalender</h2>
        <h2>Notater</h2>
        <button onClick={() => navigate("/group/members", {state: {group}})}>Medlemmer</button>
        <Footer/>
        <BottomNavBar/>
    </div>;
}

function GroupMembers() {
    const location = useLocation()

    const group = location.state.group

    return <div>
        <TopNavBar/>
        <h2>Medlemmer</h2>
        <ul>
            {group.members.map((member => (
                <div key={member}>
                    <li>{member}</li>
                </div>
            )))}
        </ul>
        <button>+ Legg til medlem</button>
        <Footer/>
        <BottomNavBar/>
    </div>;
}





function QuestionCard({subject, person, posted, question, answerAmount, likes, answers}) {

    const [showAnswer, setShowAnswers] = useState(false)

    function showAnswerFn(){

        if(showAnswer){
            setShowAnswers(false)
        }else {
            setShowAnswers(true)
        }
    }

    return <div>
        <h5>{subject}</h5>
        <h4>{person}</h4>
        <p>{posted}</p>
        <p>{question}</p>
        <h4 onClick={showAnswerFn} style={{display: "inline-block", marginRight: 20}}>{answerAmount} Svar</h4>
        <h4 style={{display: "inline-block"}}>{likes} Hearths</h4>

        {showAnswer? <div>
            {answers.map((specificAnswer) => (
                <div key={specificAnswer.answer}>
                    <h4>{specificAnswer.answer} </h4>
                    <p>({specificAnswer.votes}) votes</p>
                </div>

            ))}
        </div>: <h2></h2>}

    </div>;
}

function Questions() {

    const {data, error, loading} = useLoader(() => fetchJSON("/api/questions"))

    const [chosenSubject, setChosenSubject] = useState([])

    const subjects = []





    if(loading){
        return <h2>Loading questions..</h2>
    }

    if(error){
        return <div>
            <h2>Error</h2>
            {error}
        </div>
    }

    // gets the subject list from the backend data
    // For more easy displaying of the subject names in the dropdown menu
    data.map((subject) => {
        subjects.push(subject.subject)
    })


    return <div>
        <TopNavBar/>
        <div>
            <h2>Emner</h2>

            <select name="subject" onChange={(e) => setChosenSubject(oldArray => [...oldArray, e.target.value])} >

                {subjects.map((su) => <option key={su} value={su}>{su}</option>
                )}

            </select>
        </div>


        {
            data.map((subject) => (

                /*Choose to show the chosen subject*/

                <div>
                    {subject.questions.map((question) => (
                        <div>
                            <QuestionCard subject={subject.subject} person={question.student} posted={question.timeposted}
                                          question={question.question} answerAmount={question.answers.length} likes={question.likes} answers={question.answers} />
                        </div>
                    ))}

                </div>
            ))
        }


        <Footer/>
        <BottomNavBar/>
    </div>;
}


function TopNavBar() {

    const [showNavBar, setShowNavBar] = useState(false);

    function showNavBarFn(){
        if(showNavBar){
            setShowNavBar(false)
        }else {
            setShowNavBar(true)
        }
    }


    return <div>
        {showNavBar? <TopNavBarMenu/>: <h2></h2>}

        <h2 style={{display: "inline-block", marginRight: 20}}>&#x2190;</h2>
        <button onClick={showNavBarFn}> Menu</button>
    </div>
}

function TopNavBarMenu(){
    return <div>
        <ul>
            <li><Link to={"/"}>Forsiden</Link></li>
            <li>Still spørsmål</li>
            <li>Topplisten</li>
            <li>Flashcard</li>
            <li>Dokumentering</li>
            <li>Min Profil</li>
            <li>Mine Spørsmål</li>
            <li>Mine svar</li>
        </ul>
    </div>
}

function BottomNavBar(){

    const [showProfile, setShowProfile] = useState(false);


    function showProfileFn(){

        if (showProfile){
            setShowProfile(false)
        }else {
            setShowProfile(true)
        }
    }


    return <div>
        { showProfile ? <ProfileMenu showProfileFn={showProfileFn}/> : <div>
            <div style={{display: "inline-block", marginRight: 20}}><Link to={"/questions"}><h4>Spørsmål</h4></Link></div>
            <div style={{display: "inline-block", marginRight: 20}}><h4>Flashcards</h4></div>
            <div style={{display: "inline-block", marginRight: 20}}><Link to={"/"}><h4>Grupper</h4></Link></div>
            <div style={{display: "inline-block"}}><button onClick={showProfileFn}>Profile</button></div>
        </div> }

    </div>
}

function ProfileMenu({showProfileFn}) {
    return <div>
        <button onClick={showProfileFn}>X</button>
        <ul>
            <li>Endre profil</li>
            <li>Instillinger</li>
            <li>Notifikasjoner</li>
            <li onClick={showProfileFn} ><Link to={"/"}>Mine grupper</Link></li>
            <li>Mine spørsmål</li>
            <li>Mine svar</li>
            <li>Logg ut</li>
        </ul>

    </div>;
}

function Application() {
    return  <BrowserRouter>
        <Routes>
            <Route path={"/"} element={<GroupLinks/>}/>
            <Route path={"/searchGroup"} element={<SearchGroup/>}/>
            <Route path={"/createGroup"} element={<CreateGroup/>}/>
            <Route path={"/group/specific"} element={<ShowMyGroup/>}/>
            <Route path={"/group/members"} element={<GroupMembers/>}/>
            <Route path={"/questions"} element={<Questions/>}/>
            <Route path={"/profile"} element={<ProfileMenu/>}/>
        </Routes>
    </BrowserRouter>
}

ReactDOM.render(<Application />, document.getElementById("app"));
