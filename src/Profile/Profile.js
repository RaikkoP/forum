import { useState , useEffect } from "react";
import "./Profile.css"
import axios from "axios";

const Profile = (props) => {

    const [toggle, setToggle] = useState(false);
    const [username, setUsername] = useState(props.username);
    const [password, setPassword] = useState(props.password);
    const [bio, setBio] = useState(props.bio);
    const [upvotes, setUpvotes] = useState(props.upvotes);
    const [downvotes, setDownvotes] = useState(props.downvotes);
    const [profilePic, setProfilePic] = useState(props.profilePic);

    const changeToggle = (status) => {
        console.log(username, profilePic, bio, upvotes, downvotes);
        setToggle(status);
    }

    useEffect(() => {
        axios.post('userdata', {username,password})
        .then(
            (res) => {
                setBio(res.data[0].Bio);
                setUpvotes(res.data[0].Upvotes);
                setDownvotes(res.data[0].Downvotes);
        })
        .catch(err => console.log(err))
    }, [username, password])

    return (
        <div>
            {toggle === false && (
                <button id="profile" onClick={() => changeToggle(true)}>O</button>
            )}
            {toggle === true && (
                <div>
                    <div>
                        <button id="profile2" onClick={() => changeToggle(false)}>X</button>
                    </div>
                    <div className="info">
                        <img src={profilePic} alt="profile pic" />
                        <h1>{username}</h1>
                        <h1>{bio}</h1>
                        <h1>{upvotes}</h1>
                        <h1>{downvotes}</h1>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Profile;