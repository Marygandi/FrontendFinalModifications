// surveySubmissionActions.js

import axios from "axios";

// Action Types
export const FETCH_SURVEYS_SUCCESS = "FETCH_SURVEYS_SUCCESS";
export const FETCH_QUESTIONS_SUCCESS = "FETCH_QUESTIONS_SUCCESS";
export const SUBMIT_SURVEY_SUCCESS = "SUBMIT_SURVEY_SUCCESS";

// Action Creators
/*export const fetchSurveysSuccess = (surveys) => ({
  type: FETCH_SURVEYS_SUCCESS,
  payload: Array.isArray(surveys) ? surveys : [],
});*/
export const fetchSurveysSuccess = (surveys) => {
  return {
    type: FETCH_SURVEYS_SUCCESS,
    //payload: surveys,
    payload: Array.isArray(surveys) ? surveys : [],
  };
};

export const fetchQuestionsSuccess = (questions) => ({
  type: FETCH_QUESTIONS_SUCCESS,
  payload: questions,
});

/*export const submitSurveySuccess = () => ({
  type: SUBMIT_SURVEY_SUCCESS,
});*/


export const submitSurveySuccess = (success) => ({
  type: SUBMIT_SURVEY_SUCCESS,
  payload: success,
});



// Thunk to fetch surveys
export const fetchSurveys = () => async (dispatch) => {
  try {
    const response = await axios.get("http://localhost:5095/api/Survey");
     console.log(response.data);
    dispatch(fetchSurveysSuccess(response.data));
  } catch (error) {
    console.error("Error fetching surveys:", error);
  }
};

// Thunk to fetch questions based on surveyId
export const fetchQuestions = (surveyId) => async (dispatch) => {
  try {
    const response = await axios.get(`http://localhost:5095/api/Survey/survey1/${surveyId}`);
    //console.log('Survey API responsequestions:', response.data); 
    dispatch(fetchQuestionsSuccess(response.data.questions));
  } catch (error) {
    console.error("Error fetching questions:", error);
  }
};

// Thunk to submit survey
/*export const submitSurvey = (submissionData) => async (dispatch) => {
  try {
    await axios.post("http://localhost:5095/api/SurveySubmission", submissionData);
    dispatch(submitSurveySuccess());
  } catch (error) {
    console.error("Error submitting survey:", error);
  }
};*/



export const submitSurvey = (submissionData) => async (dispatch) => {
  try {
    await axios.post("http://localhost:5095/api/SurveySubmission", submissionData);
    dispatch(submitSurveySuccess(true)); // Pass true to indicate success
  } catch (error) {
    console.error("Error submitting survey:", error);
    dispatch(submitSurveySuccess(false)); // Pass false to indicate failure
  }
};




