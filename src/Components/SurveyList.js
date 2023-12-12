/*import React, { useState, useEffect } from "react";
import axios from "axios";

function SurveyList() {
  const [surveys, setSurveys] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    // Fetch surveys on component mount
    fetchSurveys();
  }, []);

  const fetchSurveys = async () => {
    try {
      const response = await axios.get("http://localhost:5095/api/Survey");
      console.log(response.data); // Log the response
      setSurveys(response.data);
    } catch (error) {
      console.error("Error fetching surveys:", error);
      setError("Error fetching surveys. Please try again.");
    }
  };

  return (
    <div className="survey-list">
      <h2>Survey List</h2>
      {error && <div className="error">{error}</div>}
      <ul>
        {Array.isArray(surveys) &&
          surveys.map((survey) => (
            <li key={survey.id}>{survey.title}</li>
            // Add more details or actions as needed
          ))}
      </ul>
    </div>
  );
}

export default SurveyList;*/
