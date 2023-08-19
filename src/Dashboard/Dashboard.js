import Profile from "../Profile/Profile";
import "./Dashboard.css"
import Feed from "../Feed/Feed";

const Dashboard = (props) => {

    const username = props.username;
    const password = props.password;

    return (
        <div>
            <div className="profile-container">
                <Profile
                username={username}
                password={password}
                ></Profile>
            </div>
            <div className="feed-container">
                <Feed>
                </Feed>
            </div>
        </div>
    )
}

export default Dashboard;