// rootReducer.js

import { combineReducers } from "redux";
import surveySubmissionReducer from "./surveySubmissionReducer";

const rootReducer = combineReducers({
  surveySubmission: surveySubmissionReducer,
  // Add other reducers if needed
});

export default rootReducer;
