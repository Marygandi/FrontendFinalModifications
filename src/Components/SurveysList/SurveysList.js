import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import './surveysList.css';

const SurveysList = () => {
  const [surveys, setSurveys] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // State for modal
  const [showEditModal, setShowEditModal] = useState(false);
  const [editSurveyId, setEditSurveyId] = useState(null);
  const [editSurveyData, setEditSurveyData] = useState({
    title: "",
    // Add other fields as needed
  });

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

  const handleEditSurvey = (surveyId) => {
    // Fetch survey data based on the surveyId and set it in state
    const selectedSurvey = surveys.find((survey) => survey.id === surveyId);
    setEditSurveyId(surveyId);
    setEditSurveyData({
      title: selectedSurvey.title,
      // Set other fields as needed
    });
    setShowEditModal(true);
  };

  const handleSaveEdit = () => {
    // Add logic to save the edited survey data
    console.log(`Saving edited survey with ID: ${editSurveyId}`);
    // Add axios call or other logic to save the edited data
    setShowEditModal(false);
  };

  const handleDeleteSurvey = (surveyId) => {
    // Add logic to delete the survey
    console.log(`Deleting survey with ID: ${surveyId}`);
    // Add axios call or other logic to delete the survey
  };

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
              <div>
                <button onClick={() => handleEditSurvey(survey.id)}>Edit</button>
                <button onClick={() => handleDeleteSurvey(survey.id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* Edit Modal */}
      {showEditModal && (
        <div className="edit-modal">
          <h2>Edit Survey</h2>
          <form>
            <label>Title:</label>
            <input
              type="text"
              value={editSurveyData.title}
              onChange={(e) => setEditSurveyData({ ...editSurveyData, title: e.target.value })}
            />
            {/* Add other form fields as needed */}
            <button type="button" onClick={handleSaveEdit}>
              Save
            </button>
            <button type="button" onClick={() => setShowEditModal(false)}>
              Cancel
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default SurveysList;
