import { useEffect, useState } from 'react';
import './App.css';
import LogIn from './Log-In/LogIn';
import Dashboard from './Dashboard/Dashboard';
import axios from 'axios';


function App() {

  const [loginStatus, setLoginStatus] = useState(false);
  const [guestStatus, setGuestStatus] = useState(false);
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [id, setID] = useState();
  const [accountType, setAccountType] = useState();
  const [bio, setBio] = useState("");
  const [profilePic, setProfilePic] = useState();
  const [upvotes, setUpvotes] = useState();
  const [downvotes, setDownvotes] = useState();

  if(loginStatus === true) {
    axios.post('/userdata', { username, password })
    .then(
      (res) => {
        console.log(res);
        setID(res.data[0].ID);
        setAccountType(res.data[0].ACCOUNT_TYPE);
        setBio(res.data[0].BIO);
        setProfilePic(res.data[0].USER_PROFILE_PIC)
        setUpvotes(res.data[0].UPVOTES);
        setDownvotes(res.data[0].DOWNVOTES);
      }
    ).catch((err) => {
      console.log(err);
    });
  }

  return (
    <div>
    {loginStatus === false && (
      <LogIn
      status={setLoginStatus}
      username={setUsername}
      password={setPassword}></LogIn>
      )}
    {loginStatus === true && (
      <Dashboard
      username={username}
      id={id}
      accountType={accountType}
      bio={bio}
      profilePic={profilePic}
      upvotes={upvotes}
      downvotes={downvotes}></Dashboard>
    )}
      </div>
  );
}

export default App;
