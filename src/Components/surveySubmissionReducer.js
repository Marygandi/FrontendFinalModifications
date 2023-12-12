// surveySubmissionReducer.js

import {
    FETCH_SURVEYS_SUCCESS,
    FETCH_QUESTIONS_SUCCESS,
    SUBMIT_SURVEY_SUCCESS,
  } from "./surveySubmissionAction";
  
  const initialState = {
    surveys: [], // Make sure this is an array
    questions: [],
    submissionSuccess: false,
  };
  /*const surveySubmissionReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_SURVEYS_SUCCESS:
        return { ...state, surveys: action.payload };
      case FETCH_QUESTIONS_SUCCESS:
        return { ...state, questions: action.payload };
      case SUBMIT_SURVEY_SUCCESS:
        return { ...state, submissionSuccess: true };
       
      default:
        return state;
    }
  };*/
  



const surveySubmissionReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_SURVEYS_SUCCESS:
  return { ...state, surveys: action.payload };
   

    case SUBMIT_SURVEY_SUCCESS:
      return { ...state, submissionSuccess: action.payload };

    default:
      return state;
  }
};


  
  export default surveySubmissionReducer;
  