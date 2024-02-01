import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SurveyEditComponent = () => {
  const [questions, setQuestions] = useState([]);
  const [newQuestionText, setNewQuestionText] = useState('');

  useEffect(() => {
    // Fetch questions for a survey when the component mounts
    fetchQuestionsForSurvey();
  }, []);

  const fetchQuestionsForSurvey = async () => {
    try {
      // Replace '1' with the actual surveyId
      const response = await axios.get(`http://localhost:5095/api/SurveyEdit/1/Questions`);
      setQuestions(response.data);
    } catch (error) {
      console.error('Error fetching questions:', error.message);
    }
  };

  const addQuestionToSurvey = async () => {
    try {
      // Replace '1' with the actual surveyId
      const response = await axios.post(`http://localhost:5095/api/SurveyEdit/1/Questions`, {
        text: newQuestionText,
      });
      setQuestions((prevQuestions) => [...prevQuestions, response.data]);
      setNewQuestionText('');
    } catch (error) {
      console.error('Error adding question:', error.message);
    }
  };

  const updateQuestionInSurvey = async (questionId, updatedText) => {
    try {
      // Replace '1' with the actual surveyId
      await axios.put(`http://localhost:5095/api/SurveyEdit/1/Questions/${questionId}`, {
        text: updatedText,
      });
      fetchQuestionsForSurvey(); // Refresh the questions after update
    } catch (error) {
      console.error('Error updating question:', error.message);
    }
  };

  const deleteQuestionFromSurvey = async (questionId) => {
    try {
      // Replace '1' with the actual surveyId
      await axios.delete(`http://localhost:5095/api/SurveyEdit/1/Questions/${questionId}`);
      fetchQuestionsForSurvey(); // Refresh the questions after delete
    } catch (error) {
      console.error('Error deleting question:', error.message);
    }
  };

  return (
    <div>
      <h2>Survey Questions</h2>
      <ul>
        {questions.map((question) => (
          <li key={question.id}>
            {question.text}
            <button onClick={() => updateQuestionInSurvey(question.id, 'Updated Text')}>
              Update
            </button>
            <button onClick={() => deleteQuestionFromSurvey(question.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <div>
        <h3>Add New Question</h3>
        <input
          type="text"
          value={newQuestionText}
          onChange={(e) => setNewQuestionText(e.target.value)}
        />
        <button onClick={addQuestionToSurvey}>Add Question</button>
      </div>
    </div>
  );
};

export default SurveyEditComponent;
