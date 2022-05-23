import {useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";

export function EditGroupProfile() {

    const [groupname, setGroupName] = useState("");
    const [file, setFile] = useState("");
    const navigate = useNavigate();

    const location = useLocation()

    const group = location.state.group


    async function handleSubmit(e){
        e.preventDefault();

        const res = await fetch("/api/v1/groups", {
            method: "PATCH",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({groupname, file})
        })

        navigate('/group/specific', { state: { group } })
    }


    return <div>
        <h2>Navn: {group.name}</h2>
        <h2>Bilde: </h2>

        <form onSubmit={handleSubmit}>
            <label>Nytt gruppenavn:</label>
            <div className='mb-6'>
                <input
                    type='text'
                    className='w-full p-2 border border-purple-3 rounded-standard bg-dark-6 mt-2'
                    value={groupname}
                    onChange={e => setGroupName(e.target.value)}

                />
            </div>
            <div>
                <label>Endre gruppebilde</label>
                <input type="file"
                value={file}
                onChange={e => setFile(e.target.value)}/>
            </div>
            <button>Endre</button>
        </form>
        <pre>{JSON.stringify({groupname, file})}</pre>
    </div>;
}
