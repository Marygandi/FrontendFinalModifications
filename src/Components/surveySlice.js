/*import { createSlice } from '@reduxjs/toolkit';

const surveySlice = createSlice({
  name: 'survey',
  initialState: {
    surveyName: '',
    questions: [
      { id: 1, text: 'What is your favorite color?' },
      { id: 2, text: 'How satisfied are you with our service?' },
      // Add more questions as needed
    ],
    selectedAnswers: {},
  },
  reducers: {
    setSurveyName: (state, action) => {
      state.surveyName = action.payload;
    },
    selectAnswer: (state, action) => {
      state.selectedAnswers[action.payload.questionId] = action.payload.answerId;
    },
    // Add other reducers as needed
  },
});

export const { setSurveyName, selectAnswer } = surveySlice.actions;
export default surveySlice.reducer;*/