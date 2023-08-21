import Profile from "../Profile/Profile";
import "./Dashboard.css";
import Feed from "../Feed/Feed";
import axios from "axios";
import { useState } from "react";

const Dashboard = (props) => {
  const username = props.username;
  const password = props.password;
  const [image, setImage] = useState({});

  async function uploadFile() {
    let formData = new FormData();
    formData.append("image", image);

    try {
      const response = await axios.post("/upload", formData);
    } finally {
      console.log("Wooo!");
    }
  }

  return (
    <div>
      <div className="profile-container">
        <Profile
          username={username}
          password={password}
          uploadFile={uploadFile}
          image={setImage}
        ></Profile>
      </div>
      <div className="feed-container">
        <Feed></Feed>
      </div>
    </div>
  );
};

export default Dashboard;
