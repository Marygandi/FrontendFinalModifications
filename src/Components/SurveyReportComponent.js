// SurveyReportComponent.jsx
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import axios from 'axios';
import { fetchSurveys } from "./surveySubmissionAction";
import { Link } from "react-router-dom";
import './ReportDropdown.css';


import './SurveyReportComponent.css';

function SurveyReportComponent({
  fetchSurveys,
}) {
  const [selectedSurveyId, setSelectedSurveyId] = useState("");
  const [surveyList, setSurveyList] = useState([]);
  const [surveyReportData, setSurveyReportData] = useState({
    username: "",
    respondentCount: 0,
  });

  useEffect(() => {
    console.log("Selected SurveyId (state):", selectedSurveyId);
  }, [selectedSurveyId]);

  useEffect(() => {
    fetchSurveys();
  }, [fetchSurveys]);

  useEffect(() => {
    const fetchSurveysData = async () => {
      try {
        const response = await axios.get('http://localhost:5095/api/Survey');
        if (response.statusText === "OK") {
          setSurveyList(response?.data.$values);
        }
      } catch (error) {
        console.error('Error fetching surveys:', error.message);
      }
    };

    fetchSurveysData();
  }, []);

  const handleSurveySelect = async (event) => {
    const surveyId = event.target.value;
    setSelectedSurveyId(surveyId);

    try {
      const response = await axios.get(`http://localhost:5095/api/Survey/${surveyId}/report`);
      
      console.log("Survey Report API Response:", response.data);
      if (response.statusText === "OK") {
        const surveyReportData = response.data;
        const selectedSurveyIdNumber = parseInt(surveyId, 10);
        if (surveyReportData.surveyId === selectedSurveyIdNumber) {
          setSurveyReportData({
            username: surveyReportData.username,
            respondentCount: surveyReportData.respondentCount,
          });
        } else {
          console.error("Mismatched surveyId in report data");
        }
      }
    } catch (error) {
      console.error('Error fetching survey reports:', error.message);
    }
  };

  return (
    <div className="">
      <label className="survey-subheading">Select Survey:</label>
      <select onChange={handleSurveySelect} className="survey-select">
        {surveyList?.map((survey) => (
          <option key={survey.id} value={survey.id}>
            {survey.title}
          </option>
        ))}
      </select>

      {surveyReportData.username && surveyReportData.respondentCount >= 0 && (
        <div className="survey-report">
          <h4 style={{borderBottom: '2px double steelblue'}}>
            Survey Report:</h4>
          <p>Respondent Count: {surveyReportData.respondentCount}</p>
          {/* <div>
            <h5 className="column-names">Usernames:</h5>
            <ul className="usernames-list">
              {surveyReportData.username.split(',').map((name, index) => (
                <li key={index}>{name.trim()}</li>
              ))}
            </ul>
          </div> */}
        </div>
      )}

      {/* Link to navigate to the SurveyReportPage */}
      {selectedSurveyId && (
        <Link to={`/survey-report/${selectedSurveyId}`}>
          Click here to view Survey Report
        </Link>
      )}
    </div>
  );
}

const mapDispatchToProps = {
  fetchSurveys,
};

export default connect(null, mapDispatchToProps)(SurveyReportComponent);
