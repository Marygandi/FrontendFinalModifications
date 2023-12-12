// SurveyReportPage.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const SurveyReportPage = () => {
  const { surveyId } = useParams();
  const [surveyReportData, setSurveyReportData] = useState({
    username: "",
    respondentCount: 0,
  });

  useEffect(() => {
    // Fetch survey report data based on the surveyId
    const fetchSurveyReportData = async () => {
      try {
        const response = await fetch(
          `http://localhost:5095/api/Survey/${surveyId}/report`
        );
        if (response.ok) {
          const data = await response.json();
          setSurveyReportData(data);
        } else {
          console.error("Failed to fetch survey report data");
        }
      } catch (error) {
        console.error("Error fetching survey report data:", error.message);
      }
    };

    fetchSurveyReportData();
  }, [surveyId]);

  return (
    <div className="survey-report">
      <h4 style={{borderBottom: '2px double steelblue'}} className="create-survey-heading">Survey Report:</h4>
      <p>Respondent Count: {surveyReportData.respondentCount}</p>
      <div>
        <h5>Usernames:</h5>
        <table class="reportTable" >
          <thead>
            <tr>
              <th>Index</th>
              <th>Username </th>
            </tr>
          </thead>
          <tbody>
            {surveyReportData.username &&
              surveyReportData.username.split(",").map((name, index) => (
                <tr>
                  <td>{index + 1}</td>
                  <td key={index}> {name.trim()}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SurveyReportPage;
