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
      password={password}></Dashboard>
    )}
      </div>
  );
}

export default App;
