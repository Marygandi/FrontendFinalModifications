// SurveyPage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SurveyPage = () => {
  const [surveys, setSurveys] = useState([]);

  useEffect(() => {
    // Fetch surveys when the component mounts
    const fetchSurveys = async () => {
      try {
        const response = await axios.get('http://localhost:5095/api/Survey');
        setSurveys(response.data);
      } catch (error) {
        console.error('Error fetching surveys:', error);
      }
    };

    fetchSurveys();
  }, []);

  return (
    <div>
      <h2>Surveys</h2>
      <ul>
        {surveys.map((survey) => (
          <li key={survey.id}>{survey.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default SurveyPage;
