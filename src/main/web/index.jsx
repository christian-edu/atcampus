import React, {useEffect, useState} from "react";
import ReactDOM from "react-dom";

function Application() {
    const [data,setData] = useState();
    useEffect(async () => {
        const res = await fetch("/foo/api/something");
        if (res.ok) {
            setData(await res.text());
        }
    })

    if (!data) {
        return <div>Loading...</div>
    }


    return <div>
        <h1>Hello World</h1>
        <pre>{data.toString()}</pre>
    </div>
}

ReactDOM.render(<Application />, document.getElementById("app"));
