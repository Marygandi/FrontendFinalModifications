// getallsurveys.js

import axios from 'axios';

const getAllSurveys = async () => {
  try {
    const response = await axios.get('http://localhost:5095/api/Survey');
    return response.data;
  } catch (error) {
    console.error('Error fetching surveys:', error);
    throw error; // Rethrow the error to handle it in the component that calls this function
  }
};

export default getAllSurveys;
