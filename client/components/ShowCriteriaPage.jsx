import { useLocation} from "react-router-dom";
import GroupCriteriaPage from "./GroupCriteriaPage";

import {useEffect, useState} from "react";




function ShowList({group}){

    const [userFriendlyWorkType, setUserFriendlyWorkType] = useState("");
    const [userFriendlyFrequency, setUserFriendlyFrequency] = useState("");


    useEffect(()=>{


        const frequencyValue = group.criteria.workFrequency;

        const workTypeValue = group.criteria.workType;

        if(workTypeValue === "HYBRID"){
            setUserFriendlyWorkType("Både digitalt og fysisk")
        }
        if(workTypeValue === "fysisk"){
            setUserFriendlyWorkType("Bare fysisk")
        }

        if(workTypeValue === "digitalt"){
            setUserFriendlyWorkType("Bare digitalt")
        }
        if(frequencyValue === "W1"){
            setUserFriendlyFrequency("1 gang i uken")
        }
        if(frequencyValue === "W2"){
            setUserFriendlyFrequency("2 ganger i uken")
        }
        if(frequencyValue === "W3"){
            setUserFriendlyFrequency("3 ganger i uken")
        }
        if(frequencyValue === "W4"){
            setUserFriendlyFrequency("4 ganger i uken")
        }
        if(frequencyValue === "W5"){
            setUserFriendlyFrequency("5 ganger i uken")
        }
        if(frequencyValue === "W6"){
            setUserFriendlyFrequency("6 ganger i uken")
        }
        if(frequencyValue === "W7"){
            setUserFriendlyFrequency("7 ganger i uken")
        }
        if(frequencyValue === "M1"){
            setUserFriendlyFrequency("1 gang i månden")
        }
        if(frequencyValue === "M2"){
            setUserFriendlyFrequency("2 ganger i månden")
        }
    },[])



    return <div>
        <h4>Dine kriterier</h4>
        <h4>Skole: {group.criteria.school}</h4>
        <h4>Sted: {group.criteria.location}</h4>
        <h4>Karaktermål: {group.criteria.gradeGoal}</h4>
        <h4>Arbeidsfrekvens: {userFriendlyFrequency}</h4>
        <h4>Språk: {group.criteria.language}</h4>
        <h4>Størrelse: {group.criteria.maxSize}</h4>
        <h4>Arbeidstype: {userFriendlyWorkType}</h4>
        <h4>Emner:</h4>
        {group.criteria.subject.map((subject) => (
            <h4 key={subject}>{subject}</h4>
        ))}
    </div>
}


export function ShowCriteriaPage() {
    const location = useLocation();
    const {group} = location.state

    const [editCriteria, setEditCriteria] = useState(false);


    function showCriteria(){
        if(editCriteria === true){
            setEditCriteria(false)
        }else {
            setEditCriteria(true)
        }
    }


    return <div className='bg-white p-6 text-dark-1 max-w-xl mx-auto rounded-standard'>


        <button onClick={showCriteria}>{editCriteria?<h2>Vis kriterier</h2>:<h2>Endre kriterier</h2>}</button>

        {editCriteria?<GroupCriteriaPage editGroup={true}/>:<ShowList group={group}/>}

    </div>
}