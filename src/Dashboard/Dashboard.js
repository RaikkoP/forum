import { useState, useEffect } from "react";
import axios from "axios";
import Profile from "../Profile/Profile";
import "./Dashboard.css"

const Dashboard = (props) => {

    const [username, setUsername] = useState(props.username);
    const [password, setPassword] = useState(props.password);
    const [id, setId] = useState();
    const [accountType, setAccountType] = useState();
    const [bio, setBio] = useState();
    const [profilePic, setProfilePic] = useState();
    const [upvotes, setUpvotes] = useState();
    const [downvotes, setDownvotes] = useState();

    axios.post('/userdata', { username, password })
        .then(
            (res) => {
                setUsername(res.data[0].USERNAME);
                setPassword(res.data[0].PASSWORD);
                setId(res.data[0].ID);
                setAccountType(res.data[0].ACCOUNT_TYPE);
                setBio(res.data[0].BIO);
                setProfilePic(res.data[0].USER_PROFILE_PIC)
                setUpvotes(res.data[0].UPVOTES);
                setDownvotes(res.data[0].DOWNVOTES);
            }
        ).catch((err) => {
            console.log(err);
        });

    useEffect(() => {
        console.log(username, id, accountType, bio, profilePic, upvotes, downvotes);
    }, [username, id, accountType, bio, profilePic, upvotes, downvotes]);

    return (
        <div>
            <div className="profile-container">
                <Profile
                username={username}
                profilePic={profilePic}
                bio={bio}
                upvotes={upvotes}
                downvotes={downvotes}
                ></Profile>
            </div>
        </div>
    )
}

export default Dashboard;