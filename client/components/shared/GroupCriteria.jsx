import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import Button from "./Button"

export function GroupCriteria({title, fetchLink, buttonText, patchGroup, groupName, createGroup, searchGroup}) {
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

        console.log("group results")
        console.log(groupResult)

        if(groupResult !== undefined && createGroup){
            const group = groupResult
            navigate('/group/specific', { state: { group } })
        }

        // DONT WORK
        if(searchGroup && groupResult !== undefined){
            // since response is 203 no content, it will be undefined

            // We know we searched for group
            console.log("U searched for group redirect")
            navigate("/searchGroup/searchGroupResults", { state: { groupResult} })

        }

        if(patchGroup && groupResult === "No Content"){

            console.log("Patch redirect")
            navigate("/")
        }



    }, [groupResult])


    async function searchForGroup(){







            if(patchGroup){

                if(isPrivate === undefined ) {
                    setError("Velg public eller private")
                }else{
                    const res = await fetch(fetchLink, {
                        method: "PATCH",
                        headers: {
                            "content-type": "application/json"
                        },
                        body: JSON.stringify({language, size, gradeGoal, workFrequency, workType, place, school, subject, groupName, isPrivate})
                    })

                    setGroupResult( "No Content")

                }



            }else if(createGroup) {

                if(language === "velg" || size === "velg" || gradeGoal === "velg" || workFrequency === "velg" || workType === "velg" || place === "velg" || school === "velg" || subject[0].subject.length === 0 ) {
                    setError("Fyll inn alle feltene")
                }else{
                    const res = await fetch(fetchLink, {
                        method: "PATCH",
                        headers: {
                            "content-type": "application/json"
                        },
                        body: JSON.stringify({language, size, gradeGoal, workFrequency, workType, place, school, subject, groupName, isPrivate})
                    })

                    setGroupResult( await res.json())
                }
            }else if(searchGroup) {
                // Here we search for the group
                const res = await fetch(fetchLink, {
                    method: "POST",
                    headers: {
                        "content-type": "application/json"
                    },
                    body: JSON.stringify({language, size, gradeGoal, workFrequency, workType, place, school, subject, groupName, isPrivate})
                })
                /*setGroupResult( await res.json())*/
                //Doesnt return data??

                //Temp fix with mock data
                setGroupResult( await res.json())


            }

    }

    return <div>
        <div>
            <h2 className='text-xl font-bold text-dark-1'>{title}</h2>
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
                    <h4 className="text-dark-1">Sted:</h4>
                    <input type="text" placeholder={"Eks. 'Oslo'"} onChange={(e) => setPlace(e.target.value)}
                     className='w-full p-2 border border-purple-3 rounded-standard bg-dark-6 mt-2'/>
                </div>
                <div>
                    <h4 className="text-dark-1">Skole:</h4>
                    <input type="text" placeholder={"Eks. 'Høyskolen Kristiania'"} onChange={(e) => setSchool(e.target.value)}
                    className='w-full p-2 border border-purple-3 rounded-standard bg-dark-6 mt-2'/>
                </div>
                <div>
                    <h4 className="text-dark-1">Emner:</h4>
                    <button onClick={addSubjectField}>+</button>
                    {subject.map((subInput, index) => (
                        <div key={index}>
                            <input name={"subject"} placeholder={"eks. Avansert Java"} onChange={(event => handleInputChange(event, index))}
                            className='w-full p-2 border border-purple-3 rounded-standard bg-dark-6 mt-2'/>
                        </div>
                    ))}

                </div>
                <div>
                    <select
                    defaultValue={"velg"} name="språk" onChange={(e) => setLanguage(e.target.value)}
                    className='w-full p-2 border border-purple-3 rounded-standard bg-dark-6 mt-2'>
                        <option value="velg" disabled>Språk</option>
                        <option value="Norsk">Norsk</option>
                        <option value="English">English</option>
                        <option value="Null">Ikke viktig</option>
                    </select>
                </div>
                <div>
                    <select
                    defaultValue={"velg"} name="størrelse" onChange={(e) => setSize(e.target.value)}
                    className='w-full p-2 border border-purple-3 rounded-standard bg-dark-6 mt-2'>
                        <option value="velg" disabled>Gruppestørrelse</option>
                        <option value="liten">Liten (1-4stk)</option>
                        <option value="Medium">Liten (5-7stk)</option>
                        <option value="Stor">Stor (8+)</option>
                        <option value="Null">Ikke viktig</option>
                    </select>
                </div>
            </div>
            <div>

                <select
                defaultValue={"velg"} name="karaktermål" onChange={(e) => setGradeGoal(e.target.value)}
                className='w-full p-2 border border-purple-3 rounded-standard bg-dark-6 mt-2'>
                    <option value="velg" disabled>Karaktermål</option>
                    <option value="PASS">Bestått</option>
                    <option value="D">D</option>
                    <option value="C">C</option>
                    <option value="B">B</option>
                    <option value="A">A</option>
                    <option value="Null">Ikke viktig</option>
                </select>
            </div>
            <div>
                <select
                defaultValue={"velg"} name="arbeidsfrekvens" onChange={(e) => setWorkFrequency(e.target.value)}
                className='w-full p-2 border border-purple-3 rounded-standard bg-dark-6 mt-2'>
                    <option value="velg" disabled>Arbeidsfrekvens</option>
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
            <div className="flex gap-3 items-center whitespace-nowrap mt-4 mb-8">
                <div>
                    <input type="radio" name={"metode"} id={"fysisk"} value={"LOCAL"} onChange={(e) => setWorkType(e.target.value)}/>
                    <label htmlFor="fysisk" className="ml-1">Fysisk</label>
                </div>
                <div>
                    <input type="radio" name={"metode"} id={"digitalt"} value={"REMOTE"} onChange={(e) => setWorkType(e.target.value)}/>
                    <label htmlFor="digitalt" className="ml-1">Digitalt</label>
                </div>
                <div>
                    <input type="radio" name={"metode"} id={"begge"} value={"HYBRID"} onChange={(e) => setWorkType(e.target.value)}/>
                    <label htmlFor="begge" className="ml-1">Begge</label>
                </div>
                <div>
                    <input type="radio" name={"metode"} id={"ikkeViktig"} value={"Null"} onChange={(e) => setWorkType(e.target.value)}/>
                    <label htmlFor="ikkeViktig" className="ml-1">Ikke viktig</label>
                </div>
            </div>
            <div>
                <Button type="button" onClick={searchForGroup}>{buttonText}</Button>
            </div>
        </div>
        {error ? <h2>{error}</h2>: <></>}

    </div>;
}

