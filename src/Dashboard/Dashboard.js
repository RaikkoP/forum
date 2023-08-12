import { useState, useEffect } from "react";

const Dashboard = (props) => {

    const [username, setUsername] = useState(props.username);
    const [id, setId] = useState(props.id);

    return(
        <div>
            <h1>{username}</h1>
            <h1>{id}</h1>
        </div>
    )
}

export default Dashboard;