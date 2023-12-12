// App.js

import React, { useState } from 'react';
import ResponsiveAppBar from './Components/NavBar/AppBar';
import {useNavigate} from 'react-router-dom';

import {styles} from './App.css'
import AppRoutes from './Routes/AppRoutes';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoginSelected, setIsLoginSelected] = useState(false);
  const [isRegisterSelected, setIsRegisterSelected] = useState(false);
  const [selectedSurvey, setSelectedSurvey] = useState('');
  const navigate = useNavigate();
  const handleLoginSelect = () => {
    setIsLoginSelected(true);
    setIsRegisterSelected(false);
  };

  const handleRegisterSelect = () => {
    setIsLoginSelected(false);
    setIsRegisterSelected(true);
  };

  const handleLogin = (children) => {
    setIsLoggedIn(true);
    setIsLoginSelected(false);
    setIsRegisterSelected(false);
   
    navigate('/home')
  };

  const handleRegister = () => {
    setIsLoggedIn(true);
    setIsLoginSelected(false);
    setIsRegisterSelected(false);
    navigate('/login')
  };

  const handleLogout=()=>{
    console.log("logged out")
    localStorage.removeItem('currentuser')
    setIsLoggedIn(false);
    navigate('/')
   
  }

  const Logout=()=>{ 
    localStorage.removeItem('currentuser')
    localStorage.removeItem('token')
 
    navigate('/login');
    return <>You have been Logged out!!! Please Login again!</>
  };


  const handleSurveySelect = (survey) => {
    setSelectedSurvey(survey);
  };


  
  let currentRole = JSON.parse(localStorage?.getItem('currentuser'));

  if (currentRole !== undefined && currentRole !== null) {
    const { email, username, role, token } = currentRole;
  } else {
    
    currentRole = {
      email: "",
      password: "",
      role: "",  
      token: "",
      username: ""
    };
  }
  

  const { role } = currentRole;
  
  
  const renderAuthLinks = () => {
    console.log("login",isLoggedIn)
    if (isLoggedIn) {
      return <ResponsiveAppBar role={role} isLoggedIn={isLoggedIn}  handleLogout={handleLogout}/>
     
    } else if (!isLoginSelected || isRegisterSelected) {
      return <ResponsiveAppBar role={role} loginStatus={!isLoggedIn} handleLogout={handleLogout}/>
      
    } else {
    return <Logout/>;
    }
  };

  return (
    <>
      <div >
        <div >
          <nav>
            <ul>
              {renderAuthLinks()}
            </ul>
          </nav>
        </div>
        <hr />
        <div className='main-container'>
        <AppRoutes isLoggedIn={isLoggedIn}
        isLoginSelected={isLoginSelected}
        isRegisterSelected={isRegisterSelected}
        handleLogin={handleLogin}
        Logout={Logout}
        handleRegister={handleRegister}
        handleSurveySelect={handleSurveySelect}
        selectedSurvey={selectedSurvey}




        />
        </div>
      </div>
      
    </>
  );
}

export default App;
