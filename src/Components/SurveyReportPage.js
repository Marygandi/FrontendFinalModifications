// SurveyReportPage.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

const SurveyReportPage = () => {
  const { surveyId } = useParams();
  const [surveyReportData, setSurveyReportData] = useState({
    username: "",
    respondentCount: 0,
  });
  const [surveyData, setSurveyData] = useState([{ name: "", respondentCount: 5 }]);
  const targetVariable = 100; // Set your target variable here

  useEffect(() => {
    // Fetch survey report data based on the surveyId
    const fetchSurveyReportData = async () => {
      try {
        const response = await fetch(`http://localhost:5095/api/Survey/${surveyId}/report`);
        if (response.ok) {
          const data = await response.json();
          setSurveyData([{ name: data.surveyTitle, value: data.respondentCount }]);
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
      <h4 style={{ borderBottom: '2px double steelblue' }} className="create-survey-heading">Survey Report:</h4>
      <p>Respondent Count: {surveyReportData.respondentCount}</p>
      <div>
        <h5>Usernames:</h5>
        <div>
          <table className="reportTable">
            <thead>
              <tr>
                <th>Index</th>
                <th>Username </th>
              </tr>
            </thead>
            <tbody>
              {surveyReportData.username &&
                surveyReportData.username.split(",").map((name, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{name.trim()}</td>
                  </tr>
                ))}
            </tbody>
          </table>
          <br />
          <br />
          <br />
          <div>
            <h6>Title: {surveyData[0].name}</h6>
            <BarChart width={400} height={400} data={[{ name: "Respondent Count", value: surveyReportData.respondentCount }, { name: "Target", value: targetVariable }]}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#8884d8" barSize={60} />
            </BarChart>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SurveyReportPage;
