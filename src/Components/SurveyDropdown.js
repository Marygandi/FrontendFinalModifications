import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './SurveyDropdown.css';


const SurveyDropdown = ({ onSelectSurvey }) => {
  const [surveys, setSurveys] = useState([]);
  const [selectedSurvey, setSelectedSurvey] = useState('');

  useEffect(() => {
    // Fetch the list of surveys from your API endpoint
    axios.get('your-api-endpoint-for-surveys')
      .then(response => {
        setSurveys(response.data); // Assuming the data is an array of survey names
      })
      .catch(error => {
        console.error('Error fetching surveys:', error);
      });
  }, []);

  const handleSurveyChange = (event) => {
    const selectedSurvey = event.target.value;
    setSelectedSurvey(selectedSurvey);
    onSelectSurvey(selectedSurvey);
  };

  return (
    <div>
      {/* <label htmlFor="surveyDropdown">Select Survey:</label> */}
      {/* <select
        id="surveyDropdown"
        value={selectedSurvey}
        onChange={handleSurveyChange}
      > */}
        {/* <option value="" disabled>Select a survey</option> */}
        {surveys.map(survey => (
          <option key={survey} value={survey}>{survey}</option>
        ))}
      {/* </select> */}
    </div>
  );
};

export default SurveyDropdown;
