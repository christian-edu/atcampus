import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "./shared/Button";

export function EditGroupProfile() {
  const [groupName, setGroupName] = useState("");
  const [file, setFile] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const group = location.state.group;

  const [rules, setRules] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    const res = await fetch("/api/v1/groups", {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ groupName, file, rules, uuid: group.uuid }),
    });

    navigate("/group/specific", { state: { group } });
  }

  return (
    <div className="bg-white p-6 grid gap-4 rounded-standard max-w-2xl mx-auto text-dark-1">
      <h2>
        Navn: <span className="font-bold text-lg">{group.name}</span>
      </h2>
      <h2>Bilde: </h2>

      <form onSubmit={handleSubmit}>
        <label className="text-dark-3">Nytt gruppenavn:</label>
        <div className="mb-6">
          <input
            type="text"
            className="w-full p-2 border border-purple-3 rounded-standard bg-dark-6 mt-2"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
          />
        </div>
        <div className="flex flex-col">
          <label className="text-dark-3">Endre gruppebilde</label>
          <br />
          <input
            type="file"
            value={file}
            onChange={(e) => setFile(e.target.value)}
          />
        </div>
        <div>
          <label>
            Legg til regler:
            <br />
            <div>
              <textarea
                placeholder={"eks. Alltid være tidsnok"}
                value={rules}
                onChange={(e) => setRules(e.target.value)}
              ></textarea>
            </div>
          </label>
        </div>
        <div className="lg:grid grid-cols-3 mt-6">
          <Button className="lg:col-start-2">Endre</Button>
        </div>
      </form>
    </div>
  );
}
