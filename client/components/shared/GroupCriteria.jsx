import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "./Button";

export function GroupCriteria({
  title,
  fetchLink,
  buttonText,
  patchGroup,
  groupName,
  createGroup,
  searchGroup,
  group,
}) {
  // Send a request to the backend to search for the required group with the criterias

  const [language, setLanguage] = useState("velg");
  const [size, setSize] = useState("velg");
  const [gradeGoal, setGradeGoal] = useState("velg");
  const [workFrequency, setWorkFrequency] = useState("velg");
  const [workType, setWorkType] = useState("velg");
  const [place, setPlace] = useState("velg");
  const [school, setSchool] = useState("velg");
  const [error, setError] = useState();
  const [groupResult, setGroupResult] = useState();
  const [subject, setSubject] = useState([{ subject: "" }]);
  const [isPrivate, setIsPrivate] = useState();

  const navigate = useNavigate();

  function addSubjectField() {
    const newField = { subject: "" };

    setSubject((oldArray) => [...oldArray, newField]);
  }

  function handleInputChange(event, index) {
    const data = [...subject];
    data[index][event.target.name] = event.target.value;

    setSubject(data);
  }

  useEffect(async () => {
    // Use effect, to wait for all the fields to get their right value, either from chosen in input or if not chosen, gets the old criteria, only when patching

    if (patchGroup) {
      if (
        language === "velg" ||
        gradeGoal === "velg" ||
        place === "velg" ||
        size === "velg" ||
        school === "velg" ||
        workFrequency === "velg" ||
        workType === "velg"
      ) {
        console.log("Preparing to send data");
      } else {
        const res = await fetch(fetchLink, {
          method: "PATCH",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            gradeGoal,
            language,
            place,
            size,
            school,
            subject,
            workFrequency,
            workType,
            isPrivate,
            uuid: group.uuid,
          }),
        });

        setGroupResult("No Content");
      }
    }
  }, [
    gradeGoal,
    language,
    place,
    size,
    school,
    subject,
    workFrequency,
    workType,
    isPrivate,
  ]);

  useEffect(() => {
    if (groupResult !== undefined && createGroup) {
      const group = groupResult;
      navigate("/group/specific", { state: { group } });
    }

    // DONT WORK
    if (searchGroup && groupResult !== undefined) {
      // since response is 203 no content, it will be undefined
      console.log("Search results");
      console.log(groupResult);

      // We know we searched for group
      navigate("/searchGroup/searchGroupResults", { state: { groupResult } });
    }

    if (patchGroup && groupResult === "No Content") {
      navigate("/group/specific", { state: { group } });
    }
  }, [groupResult]);

  async function searchForGroup() {
    console.log("UR URL IS");
    console.log(fetchLink);
    if (patchGroup) {
      // sjekker om brukeren vil oppdatere valget sitt, eller bruke samme verdi som var fra før for kriterier
      if (isPrivate === undefined) {
        setError("Velg public eller private");
      } else {
        if (gradeGoal === "velg") {
          setGradeGoal(group.criteria.gradeGoal);
        }
        if (language === "velg") {
          setLanguage(group.criteria.language);
        }

        if (place === "velg") {
          setPlace(group.criteria.language);
        }

        if (size === "velg") {
          setSize(group.criteria.size);
        }
        if (school === "velg") {
          setSchool(group.criteria.school);
        }

        if (workFrequency === "velg") {
          setWorkFrequency(group.criteria.workFrequency);
        }

        if (workType === "velg") {
          setWorkType(group.criteria.workType);
        }

        if (subject[0].subject.length === 0) {
          setSubject(group.criteria.subjects);
        }
      }
    } else if (createGroup) {
      if (
        language === "velg" ||
        size === "velg" ||
        gradeGoal === "velg" ||
        workFrequency === "velg" ||
        workType === "velg" ||
        place === "velg" ||
        school === "velg" ||
        subject[0].subject.length === 0
      ) {
        setError("Fyll inn alle feltene");
      } else {
        const res = await fetch(fetchLink, {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            language,
            size,
            gradeGoal,
            workFrequency,
            workType,
            place,
            school,
            subject,
            groupName,
            isPrivate,
          }),
        });

        setGroupResult(await res.json());
      }
    } else if (searchGroup) {
      // Here we search for the group

      console.log("Search criteria: ");
      console.log({
        language,
        size,
        gradeGoal,
        workFrequency,
        workType,
        place,
        school,
        subject,
        groupName,
        isPrivate,
      });

      const res = await fetch(fetchLink, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          language,
          size,
          gradeGoal,
          workFrequency,
          workType,
          place,
          school,
          subject,
          groupName,
          isPrivate,
        }),
      });

      // runs rest in useEffect when data is returned
      setGroupResult(await res.json());
    }
  }

  return (
    <div className="text-dark-1">
      <div>
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        <h4 className="text-dark-3">Velg kriterier</h4>
        <div className="flex flex-col gap-3">
          <div>
            {patchGroup || createGroup ? (
              <div className="flex gap-3 items-center my-4">
                <div className="form-check">
                  <input
                    type="radio"
                    name={"private"}
                    id={"public"}
                    value={"Public"}
                    onChange={() => setIsPrivate(false)}
                    className="form-check-input appearance-none rounded-full h-4 w-4 border border-dark-4 bg-white checked:bg-purple-1 checked:border-dark-1 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                  />
                  <label htmlFor="public" className="ml-1">
                    Offentlig
                  </label>
                </div>
                <div>
                  <input
                    type="radio"
                    name={"private"}
                    id={"private"}
                    value={"Private"}
                    onChange={() => setIsPrivate(true)}
                    className="form-check-input appearance-none rounded-full h-4 w-4 border border-dark-4 bg-white checked:bg-purple-1 checked:border-dark-1 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                  />
                  <label htmlFor="private" className="ml-1">
                    Privat
                  </label>
                </div>
              </div>
            ) : (
              <></>
            )}
          </div>
          <div>
            <h4 className="text-dark-1">Sted:</h4>
            <input
              type="text"
              placeholder={"Eks. 'Oslo'"}
              onChange={(e) => setPlace(e.target.value)}
              className="w-full p-2 border border-purple-3 rounded-standard bg-dark-6 mt-2"
            />
          </div>
          <div>
            <h4 className="text-dark-1">Skole:</h4>
            <input
              type="text"
              placeholder={"Eks. 'Høyskolen Kristiania'"}
              onChange={(e) => setSchool(e.target.value)}
              className="w-full p-2 border border-purple-3 rounded-standard bg-dark-6 mt-2"
            />
          </div>
          <div>
            <h4 className="text-dark-1">Emner:</h4>

            {subject.map((subInput, index) => (
              <div key={index}>
                <input
                  name={"subject"}
                  placeholder={"eks. Avansert Java"}
                  onChange={(event) => handleInputChange(event, index)}
                  className="w-full p-2 border border-purple-3 rounded-standard bg-dark-6 mt-2"
                />
              </div>
            ))}
            <button
              onClick={addSubjectField}
              className="p-2 mt-2 border border-purple-3 rounded-standard outline-dark-3 hover:bg-dark-6"
            >
              + Legg til fler
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <select
                defaultValue={"velg"}
                name="språk"
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full p-2 border border-purple-3 rounded-standard bg-dark-6 mt-2"
              >
                <option value="velg" disabled>
                  Språk
                </option>
                <option value="Norsk">Norsk</option>
                <option value="English">English</option>
                <option value="Null">Ikke viktig</option>
              </select>
            </div>
            <div>
              <select
                defaultValue={"velg"}
                name="størrelse"
                onChange={(e) => setSize(e.target.value)}
                className="w-full p-2 border border-purple-3 rounded-standard bg-dark-6 mt-2"
              >
                <option value="velg" disabled>
                  Gruppestørrelse
                </option>
                <option value="Liten (2-4stk)">Liten (1-4stk)</option>
                <option value="Medium (5-7stk)">Medium (5-7stk)</option>
                <option value="Stor (8+)">Stor (8+)</option>
                <option value="Ikke viktig">Ikke viktig</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <select
                defaultValue={"velg"}
                name="karaktermål"
                onChange={(e) => setGradeGoal(e.target.value)}
                className="w-full p-2 border border-purple-3 rounded-standard bg-dark-6 mt-2"
              >
                <option value="velg" disabled>
                  Karaktermål
                </option>
                <option value="PASS">Bestått</option>
                <option value="D">D</option>
                <option value="C">C</option>
                <option value="B">B</option>
                <option value="A">A</option>
                <option value="Bestått">Ikke viktig</option>
              </select>
            </div>
            <div>
              <select
                defaultValue={"velg"}
                name="arbeidsfrekvens"
                onChange={(e) => setWorkFrequency(e.target.value)}
                className="w-full p-2 border border-purple-3 rounded-standard bg-dark-6 mt-2"
              >
                <option value="velg" disabled>
                  Arbeidsfrekvens
                </option>
                <option value="1 gang i uka">En gang i uka</option>
                <option value="2 ganger i uka">To ganger i uka</option>
                <option value="3 ganger i uka">Tre ganger i uka</option>
                <option value="4 ganger i uka">Fire ganger i uka</option>
                <option value="5 ganger i uka">Fem ganger i uka</option>
                <option value="6 ganger i uka">Seks ganger i uka</option>
                <option value="Hver dag">Syv ganger i uka</option>
                <option value="En gang i måneden">En gang i månden</option>
                <option value="Annenhver uke">To ganger i månden</option>
                <option value="Hva som helst">Ikke viktig</option>
              </select>
            </div>
          </div>

          <div className="flex gap-3 items-center mt-4 mb-8">
            <div>
              <input
                type="radio"
                name={"metode"}
                id={"fysisk"}
                value={"Fysisk"}
                onChange={(e) => setWorkType(e.target.value)}
                className="form-check-input appearance-none rounded-full h-4 w-4 border border-dark-4 bg-white checked:bg-purple-1 checked:border-dark-1 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
              />
              <label htmlFor="fysisk">Fysisk</label>
            </div>
            <div>
              <input
                type="radio"
                name={"metode"}
                id={"digitalt"}
                value={"Digitalt"}
                onChange={(e) => setWorkType(e.target.value)}
                className="form-check-input appearance-none rounded-full h-4 w-4 border border-dark-4 bg-white checked:bg-purple-1 checked:border-dark-1 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
              />
              <label htmlFor="digitalt">Digitalt</label>
            </div>
            <div>
              <input
                type="radio"
                name={"metode"}
                id={"begge"}
                value={"Begge"}
                onChange={(e) => setWorkType(e.target.value)}
                className="form-check-input appearance-none rounded-full h-4 w-4 border border-dark-4 bg-white checked:bg-purple-1 checked:border-dark-1 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
              />
              <label htmlFor="begge">Begge</label>
            </div>
            <div>
              <input
                type="radio"
                name={"metode"}
                id={"ikkeViktig"}
                value={"Hva som helst"}
                onChange={(e) => setWorkType(e.target.value)}
                className="form-check-input appearance-none rounded-full h-4 w-4 border border-dark-4 bg-white checked:bg-purple-1 checked:border-dark-1 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
              />
              <label htmlFor="ikkeViktig">Ikke viktig</label>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3">
            <Button
              type="button"
              onClick={searchForGroup}
              className="md:col-start-2"
            >
              {buttonText}
            </Button>
          </div>
        </div>
      </div>
      {error ? <h2>{error}</h2> : <></>}
    </div>
  );
}
