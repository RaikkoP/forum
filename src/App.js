import { useEffect, useState } from 'react';
import './App.css';
import LogIn from './Log-In/LogIn';


function App() {

  const [loginStatus, setLoginStatus] = useState(false);
  const [guestStatus, setGuestStatus] = useState(false);

  useEffect(() => {
    console.log(loginStatus)
  })
  
  return (
    <div className='background'>
      <LogIn status={setLoginStatus}></LogIn>
    </div>
  );
}

export default App;
