import { BrowserRouter as Router, Routes, Route, Link ,useNavigate} from 'react-router-dom';
import Home from '../Components/Home/Home';
import Welcome from '../Components/Welcome';
import Login from '../Components/Login';
import RegisterUser from '../Components/RegisterUser';
import CreateSurvey from '../Components/CreateSurvey';
import SurveySubmissionComponent from '../Components/SurveySubmissionComponent';
import SurveyDropdown from '../Components/SurveyDropdown';
import SurveyReportComponent from '../Components/SurveyReportComponent'; // Import the new component
import SurveyReportPage from '../Components/SurveyReportPage'; // Import the new page component
import Protected from './Protected';
import Profile from '../Components/Profile/Profile';


const AppRoutes = (  {isLoggedIn,isLoginSelected,isRegisterSelected,
  handleLogin,Logout,handleRegister,selectedSurvey,
  handleSurveySelect}) => {
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
    console.log("loggedIn status",isLoggedIn)
  return (
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route exact path="/home" element={<Home />} />
      <Route
        path="/login"
        element={
          !isLoggedIn && !isLoginSelected && !isRegisterSelected ? (
            <Login onLogin={handleLogin} />
          ) : (
            <Logout />
          )
        }
      />
      <Route
        path="/register"
        element={
          !isLoggedIn && !isLoginSelected && !isRegisterSelected ? (
            <RegisterUser onRegister={handleRegister} />
          ) : (
            <Logout />
          )
        }
      />
      
      <Route
              path="/surveys"
              element={
                isLoggedIn ? (
                  <Protected>
                    <SurveyDropdown onSelectSurvey={handleSurveySelect} />
                    <SurveySubmissionComponent selectedSurvey={selectedSurvey} />
                  </Protected>
                  
                ) : (
                  <Logout />
                )
            
              }
            />
    
   
      <Route
        path="/create-survey"
        element={(isLoggedIn && role.toLowerCase()=="admin") && <Protected><CreateSurvey /></Protected>}
      />
       
      <Route
        path="/survey-reports"
        element={(isLoggedIn && role.toLowerCase()=="admin" ) &&  <Protected><SurveyReportComponent /></Protected>}
      />
      {/* New route for the SurveyReportPage */}
      <Route path="/survey-report/:surveyId" element={<SurveyReportPage />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  );
};


export default AppRoutes;