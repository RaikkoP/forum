import { useState } from "react";
import "./Profile.css"

const Profile = (props) => {

    const [toggle, setToggle] = useState(false);
    const [username, setUsername] = useState(props.username);
    const [bio, setBio] = useState(props.bio);
    const [upvotes, setUpvotes] = useState(props.upvotes);
    const [downvotes, setDownvotes] = useState(props.downvotes);
    const [profilePic, setProfilePic] = useState(props.profilePic);

    const changeToggle = (status) => {
        setToggle(status);
    }

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
                        <h1>{profilePic}</h1>
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