import { useCallback, useEffect, useState } from "react";
import Button from "./shared/Button";
import { GroupCriteria } from "./shared/GroupCriteria";
import UserCard from "./shared/UserCard";
import { useLoader } from "../useLoader";
import { fetchJSON } from "../fetchJSON";

const SearchUser = () => {
  // Needs work

  const [user, setUser] = useState([]);
  const [email, setEmail] = useState("");
  const [userName, setUsername] = useState("");
  const [usernameOrEmail, setUsernameOrEmail] = useState("");

  useEffect(() => {}, [user]);

  async function search() {
    const res = await fetch("/api/v1/user/search", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ userName, email }),
    });

    setUser(await res.json());
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-4 bg-white text-dark-1 p-6 rounded-standard max-w-2xl mx-auto mb-6">
        <div>
          <h2 className="text-xl font-bold">Legg til medlem</h2>
        </div>
        <div>
          <input
            type="radio"
            name={"emailOrName"}
            value={"mail"}
            onChange={(event) => setUsernameOrEmail(event.target.value)}
          />
          <label htmlFor="email">Søk etter epost</label>
          <input
            type="radio"
            name={"emailOrName"}
            value={"name"}
            checked={true}
            onChange={(event) => setUsernameOrEmail(undefined)}
          />
          <label htmlFor="userName">Søk etter brukernavn</label>
          {usernameOrEmail ? (
            <input
              type="email"
              id="email"
              placeholder="eks. student@kristiania.no"
              className="w-full p-2 border border-purple-3 rounded-standard bg-dark-6 mt-2"
              onChange={(event) => setEmail(event.target.value)}
            />
          ) : (
            <input
              type="text"
              id="userName"
              placeholder="eks. Torleif Jakobsen"
              className="w-full p-2 border border-purple-3 rounded-standard bg-dark-6 mt-2"
              onChange={(event) => setUsername(event.target.value)}
            />
          )}

          <button onClick={search}>Søk</button>
        </div>

        <ul>
          {user ? (
            user.map((specificUser) => (
              <li>
                {specificUser.username} ({specificUser.email})
              </li>
            ))
          ) : (
            <h2>Ingen brukere</h2>
          )}
        </ul>
      </div>
    </>
  );
};

export default SearchUser;
