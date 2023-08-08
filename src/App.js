import { useState } from 'react';
import './App.css';
import LogIn from './Log-In/LogIn';


function App() {

  const [loginStatus, setLoginStatus] = useState(false);
  const [guestStatus, setGuestStatus] = useState(false);



  
  return (
    <div className='background'>
      <LogIn></LogIn>
    </div>
  );
}

export default App;
