import { useEffect, useState } from 'react';
import './App.css';
import LogIn from './Log-In/LogIn';
import Dashboard from './Dashboard/Dashboard';


function App() {

  const [loginStatus, setLoginStatus] = useState(false);
  const [guestStatus, setGuestStatus] = useState(false);
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  useEffect(() => {
    console.log(loginStatus);
  },[loginStatus]);


  return (
    <div>
    {loginStatus === false && (
      <LogIn
      status={setLoginStatus}
      username={setUsername}
      password={setPassword}></LogIn>
      )}
    {loginStatus && (
      <Dashboard
      username={username}
      password={password}></Dashboard>
    )}
      </div>
  );
}

export default App;
