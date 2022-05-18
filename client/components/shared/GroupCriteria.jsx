import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import Button from "./Button"

export function GroupCriteria({title, fetchLink, buttonText, patchGroup, groupName, createGroup}) {
    // Send a request to the backend to search for the required group with the criterias

    const [language, setLanguage] = useState("velg")
    const [size, setSize] = useState("velg");
    const [gradeGoal, setGradeGoal] = useState("velg");
    const [workFrequency, setWorkFrequency] = useState("velg");
    const [workType, setWorkType] = useState("velg");
    const [place, setPlace] = useState("velg");
    const [school, setSchool] = useState("velg");
    const [error, setError] = useState();
    const [groupResult, setGroupResult] = useState();
    const [subject, setSubject] = useState([{subject: ""}]);
    const [isPrivate, setIsPrivate] = useState();

    const navigate = useNavigate();


    function addSubjectField () {
        const newField = {subject: ""};

        setSubject((oldArray) => [...oldArray, newField])
    }

    function handleInputChange(event, index){
        const data = [...subject];
        data[index][event.target.name] = event.target.value;

        setSubject(data)

    }

    useEffect(() => {

        if(groupResult !== undefined && createGroup){
            navigate("/", { state: { groupResult} })
        }

    }, [groupResult])


    async function searchForGroup(){


        if(language === "velg" || size === "velg" || gradeGoal === "velg" || workFrequency === "velg" || workType === "velg" || place === "velg" || school === "velg" || subject[0].subject.length === 0 ){
            setError("Fyll inn alle feltene")
        }else {



            if(patchGroup){
                const res = await fetch(fetchLink, {
                    method: "PATCH",
                    headers: {
                        "content-type": "application/json"
                    },
                    body: JSON.stringify({language, size, gradeGoal, workFrequency, workType, place, school, subject, groupName, isPrivate})
                })

                setGroupResult( await res.json())

            }else {
                const res = await fetch(fetchLink, {
                    method: "POST",
                    headers: {
                        "content-type": "application/json"
                    },
                    body: JSON.stringify({language, size, gradeGoal, workFrequency, workType, place, school, subject, groupName, isPrivate})
                })

                setGroupResult( await res.json())
            }




        }
    }

    return <div>
        <div>
            <h2 className='text-xl font-bold'>{title}</h2>
        <h4>Velg kriterier</h4>
            <div>
                <div>
                    {patchGroup||createGroup?<div>
                        <input type="radio" name={"private"} id={"public"} value={"Public"} onChange={(e) => setIsPrivate(false)}/>
                        <label htmlFor="public">Public</label>
                        <input type="radio" name={"private"} id={"private"} value={"Private"} onChange={(e) => setIsPrivate(true)}/>
                        <label htmlFor="private">Private</label>
                    </div>:<></>}
                </div>
                <div>
                    <h4>Sted:</h4>
                    <input type="text" placeholder={"Eks. 'Oslo'"} onChange={(e) => setPlace(e.target.value)}/>
                </div>
                <div>
                    <h4>Skole:</h4>
                    <input type="text" placeholder={"Eks. 'Høyskolen Kristiania'"} onChange={(e) => setSchool(e.target.value)}/>
                </div>
                <div>
                    <h4>Emner:</h4>
                    <button onClick={addSubjectField}>+</button>
                    {subject.map((subInput, index) => (
                        <div key={index}>
                            <input name={"subject"} placeholder={"eks. Avansert Java"} onChange={(event => handleInputChange(event, index))} />
                        </div>
                    ))}

                </div>
                <div>
                    <select defaultValue={"velg"} name="språk" onChange={(e) => setLanguage(e.target.value)}>
                        <option value="velg" disabled>språk</option>
                        <option value="Norsk">Norsk</option>
                        <option value="English">English</option>
                        <option value="Null">Ikke viktig</option>
                    </select>
                </div>
                <div>
                    <select defaultValue={"velg"} name="størrelse" onChange={(e) => setSize(e.target.value)}>
                        <option value="velg" disabled>gruppestørrelse</option>
                        <option value="liten">Liten (1-4stk)</option>
                        <option value="Medium">Liten (5-7stk)</option>
                        <option value="Stor">Stor (8+)</option>
                        <option value="Null">Ikke viktig</option>
                    </select>
                </div>
            </div>
            <div>

                <select defaultValue={"velg"} name="karaktermål" onChange={(e) => setGradeGoal(e.target.value)}>
                    <option value="velg" disabled>karaktermål</option>
                    <option value="PASS">Bestått</option>
                    <option value="D">D</option>
                    <option value="C">C</option>
                    <option value="B">B</option>
                    <option value="A">A</option>
                    <option value="Null">Ikke viktig</option>
                </select>
            </div>
            <div>
                <select defaultValue={"velg"} name="arbeidsfrekvens" onChange={(e) => setWorkFrequency(e.target.value)}>
                    <option value="velg" disabled>arbeidsfrekvens</option>
                    <option value="W1">En gang i uka</option>
                    <option value="W2">To ganger i uka</option>
                    <option value="W3">Tre ganger i uka</option>
                    <option value="W4">Fire ganger i uka</option>
                    <option value="W5">Fem ganger i uka</option>
                    <option value="W6">Seks ganger i uka</option>
                    <option value="W7">Syv ganger i uka</option>
                    <option value="M1">En gang i månden</option>
                    <option value="M2">To ganger i månden</option>
                    <option value="Null">Ikke viktig</option>
                </select>
            </div>
            <div>
                <input type="radio" name={"metode"} id={"fysisk"} value={"LOCAL"} onChange={(e) => setWorkType(e.target.value)}/>
                <label htmlFor="fysisk">Fysisk</label>
                <input type="radio" name={"metode"} id={"digitalt"} value={"REMOTE"} onChange={(e) => setWorkType(e.target.value)}/>
                <label htmlFor="digitalt">Digitalt</label>
                <input type="radio" name={"metode"} id={"begge"} value={"HYBRID"} onChange={(e) => setWorkType(e.target.value)}/>
                <label htmlFor="begge">Begge</label>
                <input type="radio" name={"metode"} id={"ikkeViktig"} value={"Null"} onChange={(e) => setWorkType(e.target.value)}/>
                <label htmlFor="ikkeViktig">Ikke viktig</label>
                <div >
                    <Button type="button" onClick={searchForGroup}>{buttonText}</Button>
                </div>
            </div>
        </div>
        {error ? <h2>{error}</h2>: <></>}

    </div>;
}

