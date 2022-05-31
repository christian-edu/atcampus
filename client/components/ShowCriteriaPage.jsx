import { useLocation } from "react-router-dom";
import GroupCriteriaPage from "./GroupCriteriaPage";
import Button from "./shared/Button";

import { useEffect, useState } from "react";

function ShowList({ group }) {
  const [userFriendlyLocation, setUserFriendlyLocation] = useState("");
  const [userFriendlyLanguage, setUserFriendlyLanguage] = useState("");
  console.log(group);

  useEffect(() => {
    const workTypeValue = group.criteria.workType;

    const locationValue = group.criteria.location;

    const languageValue = group.criteria.language;

    if (languageValue === "Null") {
      setUserFriendlyLanguage("Ikke viktig");
    } else {
      setUserFriendlyLanguage(languageValue);
    }

    if (locationValue === "Null") {
      setUserFriendlyLocation("Ikke viktig");
    } else {
      setUserFriendlyLocation(locationValue);
    }
  }, []);

  return (
    <div className="max-w-xs">
      <h4 className="font-bold text-xl">Dine kriterier</h4>
      <ul className='flex flex-col gap-5 mt-6 mb-4 mx-auto'>
        <li className='text-sm text-dark-3 px-1 outline outline-1 outline-purple-3 outline-offset-4 rounded'>Skole: <span className="text-dark-1">{group.criteria.school}</span></li>
        <li className='text-sm text-dark-3 px-1 outline outline-1 outline-purple-3 outline-offset-4 rounded'>Sted: <span className="text-dark-1">{userFriendlyLocation}</span></li>
        <li className='text-sm text-dark-3 px-1 outline outline-1 outline-purple-3 outline-offset-4 rounded'>Karaktermål: <span className="text-dark-1">{group.criteria.gradeGoal}</span></li>
        <li className='text-sm text-dark-3 px-1 outline outline-1 outline-purple-3 outline-offset-4 rounded'>Arbeidsfrekvens: <span className="text-dark-1">{group.criteria.workFrequency}</span></li>
        <li className='text-sm text-dark-3 px-1 outline outline-1 outline-purple-3 outline-offset-4 rounded'>Språk: <span className="text-dark-1">{userFriendlyLanguage}</span></li>
        <li className='text-sm text-dark-3 px-1 outline outline-1 outline-purple-3 outline-offset-4 rounded'>Størrelse: <span className="text-dark-1">{group.criteria.maxSize}</span></li>
        <li className='text-sm text-dark-3 px-1 outline outline-1 outline-purple-3 outline-offset-4 rounded'>Arbeidstype: <span className="text-dark-1">{group.criteria.workType}</span></li>
        <li className='text-sm text-dark-3 px-1 outline outline-1 outline-purple-3 outline-offset-4 rounded'>Emner:
          {group.criteria.subjects.map((subject) => (
            <p key={subject} className="text-dark-1">{subject}</p>
          ))}
        </li>
        
        <li className='text-sm text-dark-3 px-1 outline outline-1 outline-purple-3 outline-offset-4 rounded'>Regler: <p className="text-dark-1">{group.rules}</p></li>
        
      </ul>
      
    </div>
  );
}

export function ShowCriteriaPage() {
  const location = useLocation();
  const { group } = location.state;

  const [editCriteria, setEditCriteria] = useState(false);

  function showCriteria() {
    if (editCriteria === true) {
      setEditCriteria(false);
    } else {
      setEditCriteria(true);
    }
  }

  return (
    <div className="bg-white p-6 text-dark-1 max-w-2xl mx-auto rounded-standard">
      <div className="grid grid-cols-1 md:grid-cols-3">
        <Button onClick={showCriteria} className='md:col-start-2 mb-10'>
        {editCriteria ? <h2>Vis kriterier</h2> : <h2>Endre kriterier</h2>}
        </Button>
      </div>
      

      {editCriteria ? (
        <GroupCriteriaPage editGroup={true} />
      ) : (
        <ShowList group={group} />
      )}
    </div>
  );
}
