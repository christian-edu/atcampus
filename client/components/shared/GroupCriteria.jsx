import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

export function GroupCriteria() {
    // Send a request to the backend to search for the required group with the criterias

    const [language, setLanguage] = useState("velg")
    const [size, setSize] = useState("velg");
    const [gradeGoal, setGradeGoal] = useState("velg");
    const [frequency, setFrequency] = useState("velg");
    const [workMethod, setWorkMethod] = useState("velg");
    const [place, setPlace] = useState("velg");
    const [school, setSchool] = useState("velg");
    const [error, setError] = useState();
    const [groupResult, setGroupResult] = useState();
    const [subject, setSubject] = useState([{subject: ""}]);

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


    // need to fetch the data from all the input fields


    useEffect(() => {

        if(groupResult !== undefined){
            navigate("/searchGroup/searchGroupResults", { state: { groupResult} })
        }

    }, [groupResult])


    async function searchForGroup(){

        if(language === "velg" || size === "velg" || gradeGoal === "velg" || frequency === "velg" || workMethod === "velg" || place === "velg" || school === "velg" ){
            setError("Fyll inn alle feltene")
        }else {

            /*const res = await fetch('/api/v1/groups/search?' + new URLSearchParams({subject, size, gradeGoal, frequency, workMethod, language, place, school}));*/

            const res = await fetch("/api/v1/groups/search", {
                method: "POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({language, size, gradeGoal, frequency, workMethod, place, school, subject})
            })

           setGroupResult( await res.json())

        }
    }

    return <div>
        <div>
            <h2 className='text-xl font-bold'>Søk etter gruppekriterier</h2>
        <h4>Velg kriterier for søket</h4>
            <div>
                <div>
                    <h4>Sted:</h4>
                    <input type="text" placeholder={"Eks. 'Oslo'"} onChange={(e) => setPlace(e.target.value)}/>
                </div>
                <div>
                    <h4>Skole:</h4>
                    <input type="text" placeholder={"Eks. 'Høyskolen Kristiania'"} onChange={(e) => setSchool(e.target.value)}/>
                </div>
                <div>

                    <button onClick={addSubjectField}>+</button>
                    {subject.map((subInput, index) => (
                        <div key={index}>
                            <input name={"subject"} placeholder={"eks. Avansert Java"} onChange={(event => handleInputChange(event, index))} />
                        </div>
                    ))}

                   {/* <h4>Emne:</h4>
                        <input type="text" placeholder={"Eks. 'Avansert Java'"} onBlur={(e) => setSubject(oldArray => [...oldArray, e.target.value])}/>
                        <div><button onClick={addSubjectField}>+</button></div>
                        {subjectFieldsCounter.map((field) => (
                            <h2>
                                <input type="text" placeholder={"Eks. 'Avansert Java'"} onBlur={(e) => setSubject(oldArray => [...oldArray, e.target.value])}/>
                            </h2>
                        ))}*/}
                </div>
                <div>
                    <select defaultValue={"velg"} name="språk" onChange={(e) => setLanguage(e.target.value)}>
                        <option value="velg" disabled>språk</option>
                        <option value="Norsk">Norsk</option>
                        <option value="Engelsk">Engelsk</option>
                    </select>
                </div>
                <div>
                    <select defaultValue={"velg"} name="størrelse" onChange={(e) => setSize(e.target.value)}>
                        <option value="velg" disabled>gruppestørrelse</option>
                        <option value="liten">Liten (1-4stk)</option>
                        <option value="Medium">Liten (5-7stk)</option>
                        <option value="Stor">Stor (8+)</option>
                    </select>
                </div>
            </div>
            <div>

                <select defaultValue={"velg"} name="karaktermål" onChange={(e) => setGradeGoal(e.target.value)}>
                    <option value="velg" disabled>karaktermål</option>
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                    <option value="D">D</option>
                    <option value="E">E</option>
                    <option value="F">F</option>
                </select>
            </div>
            <div>
                <select defaultValue={"velg"} name="arbeidsfrekvens" onChange={(e) => setFrequency(e.target.value)}>
                    <option value="velg" disabled>arbeidsfrekvens</option>
                    <option value="Månedlig">Månedlig</option>
                    <option value="Ukentlig">Ukentlig</option>
                </select>
            </div>
            <div>
                <input type="radio" name={"metode"} id={"fysisk"} value={"fysisk"} onChange={(e) => setWorkMethod(e.target.value)}/>
                <label htmlFor="fysisk">Fysisk</label>
                <input type="radio" name={"metode"} id={"digitalt"} value={"digitalt"} onChange={(e) => setWorkMethod(e.target.value)}/>
                <label htmlFor="digitalt">Digitalt</label>
                <input type="radio" name={"metode"} id={"begge"} value={"begge"} onChange={(e) => setWorkMethod(e.target.value)}/>
                <label htmlFor="begge">Begge</label>
                <div >
                    {/*Button css needs styling fix*/}
                    <button onClick={searchForGroup}>Søk etter kriterier</button>
                </div>
            </div>
        </div>
        {error ? <h2>{error}</h2>: <></>}

    </div>;
}

