import { useLocation } from "react-router-dom";
import GroupCriteriaPage from "./GroupCriteriaPage";

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
    <div>
      <h4>Dine kriterier</h4>

      <h4>Skole: {group.criteria.school}</h4>
      <h4>Sted: {userFriendlyLocation}</h4>
      <h4>Karaktermål: {group.criteria.gradeGoal}</h4>
      <h4>Arbeidsfrekvens: {group.criteria.workFrequency}</h4>
      <h4>Språk: {userFriendlyLanguage}</h4>
      <h4>Størrelse: {group.criteria.maxSize}</h4>
      <h4>Arbeidstype: {group.criteria.workType}</h4>
      <h4>Emner:</h4>
      {group.criteria.subjects.map((subject) => (
        <h4 key={subject}>{subject}</h4>
      ))}
      <h4>Regler: </h4>
      <h4>{group.rules}</h4>
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
    <div className="bg-white p-6 text-dark-1 max-w-xl mx-auto rounded-standard">
      <button onClick={showCriteria}>
        {editCriteria ? <h2>Vis kriterier</h2> : <h2>Endre kriterier</h2>}
      </button>

      {editCriteria ? (
        <GroupCriteriaPage editGroup={true} />
      ) : (
        <ShowList group={group} />
      )}
    </div>
  );
}
