import React, { useState, useEffect } from "react";
import axios from "axios";
import './surveysList.css';



const SurveysList = () => {
  const [surveys, setSurveys] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSurveys = async () => {
      try {
        const response = await axios.get("http://localhost:5095/api/Survey");        
        setSurveys(response.data.$values); 
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchSurveys();
  }, []);

  return (
    <>
      <h5 className="surveysList-heading">List of Surveys Available:</h5>
      {loading && <p>Loading surveys...</p>}
      {error && <p>Error fetching surveys: {error.message}</p>}
      {surveys.length > 0 && (
        <ul>
          {surveys.map((survey) => (
            <li key={survey.id}>
              Survey ID: {survey.id}, Title: {survey.title}
            </li>
          ))}
        </ul>
      )}
     
    
    </>
  );
};

export default SurveysList;
