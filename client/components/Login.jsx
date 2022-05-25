import {useState} from "react";
import {useNavigate} from "react-router-dom";

export function Login() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate()

  async  function sendLogin(){



        const res = await fetch("/api/v1/login", {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({username, password})
        })

      if(res.status === 200){
        navigate("/")
      }
      // Make more error handling, incase there is wrong password etc

    }

    return <div>
        <div>
        <label>Username: <input type="text" value={username} onChange={(event => setUsername(event.target.value))}/></label>
        </div>
        <div>
        <label>Password: <input type="password" value={password} onChange={event => setPassword(event.target.value)}/></label>
        </div>
        <button onClick={sendLogin}>Log inn</button>
        <pre>{JSON.stringify({username, password})}</pre>
    </div>
}