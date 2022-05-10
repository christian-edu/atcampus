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
    </div>;
}

function Footer(){

    // Linke til atcampus sider?


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
            </div>
            <button>Vis resultater</button>

        </div>
        <Footer/>
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
        </div>
    }



    return <div>
        <h2>Opprett gruppe</h2>
        <form onSubmit={handleSubmit} >
            <label>Gruppenavn: <input type="text" value={groupname} onChange={e => setGroupName(e.target.value)}/></label>
            <button>Opprett gruppe</button>
        </form>

            <Link to={"/"}>Frontpage</Link>
    </div>;
}

function ShowMyGroup() {
    const location = useLocation()

    const navigate = useNavigate()
    const group = location.state.group

    return <div>
        <h2>{group.groupname}</h2>
        <h2>Chat</h2>
        <h2>Møtekalender</h2>
        <h2>Notater</h2>
        <button onClick={() => navigate("/group/members", {state: {group}})}>Medlemmer</button>
        <Footer/>
    </div>;
}

function GroupMembers() {
    const location = useLocation()

    const group = location.state.group

    return <div>
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
        </Routes>
    </BrowserRouter>
}

ReactDOM.render(<Application />, document.getElementById("app"));
