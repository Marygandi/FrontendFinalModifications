// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import './surveysList.css';

// const SurveysList = () => {
//   const [surveys, setSurveys] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // State for modal
//   const [showEditModal, setShowEditModal] = useState(false);
//   const [editSurveyId, setEditSurveyId] = useState(null);
//   const [editSurveyData, setEditSurveyData] = useState({
//     title: "",
//     questions: [],  // Initialize with an empty array
//   });

//   useEffect(() => {
//     const fetchSurveys = async () => {
//       try {
//         const response = await axios.get('http://localhost:5095/api/Survey');
//         console.log("fetch1", response)
//         setSurveys(response.data.$values);
//       } catch (error) {
//         setError(error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchSurveys();
//   }, []);
//   console.log("surveys1", surveys);

//   const handleEditSurvey = async (surveyId) => {
//     try {
//       const response = await axios.get(`http://localhost:5095/api/Survey/survey1/${surveyId}`);
//       const surveyData = response.data;
//       console.log(surveyData, "surveys2");
//       console.log("questions", surveyData.questions);

//       // Ensure that questions is an array, handle cases where it's not provided
//       const questionsArray = Object.values(surveyData.questions || {});

//       setEditSurveyId(surveyId);
//       setEditSurveyData({
//         title: surveyData.title,
//         questions: questionsArray,
//       });
//       setShowEditModal(true);
//     } catch (error) {
//       console.error("Error fetching survey data for editing:", error.message);
//     }
//   };

//   const handleSaveEdit = async () => {
//     try {
//       // Add logic to save the edited survey data
//       console.log(`Saving edited survey with ID: ${editSurveyId}`, editSurveyData);
//       await axios.put(`http://localhost:5095/api/Survey/${editSurveyId}`, editSurveyData);
//       setShowEditModal(false);
//     } catch (error) {
//       console.error("Error saving edited survey:", error.message);
//     }
//   };

//   const handleDeleteSurvey = async (surveyId) => {
//     try {
//       // Add logic to delete the survey
//       console.log(`Deleting survey with ID: ${surveyId}`);
//       await axios.delete(`http://localhost:5095/api/Survey/${surveyId}`);
//       // Refresh the list of surveys after deletion
//       const updatedSurveys = surveys.filter((survey) => survey.id !== surveyId);
//       setSurveys(updatedSurveys);
//     } catch (error) {
//       console.error("Error deleting survey:", error.message);
//     }
//   };

//   const handleEditQuestion = (questionIndex, editedQuestion) => {
//     // Update the edited question in the state
//     setEditSurveyData((prevData) => {
//       const updatedQuestions = [...prevData.questions];
//       updatedQuestions[questionIndex] = editedQuestion;
//       return { ...prevData, questions: updatedQuestions };
//     });
//   };

//   return (
//     <>
//       <h5 className="surveysList-heading">List of Surveys Available:</h5>
//       {loading && <p>Loading surveys...</p>}
//       {error && <p>Error fetching surveys: {error.message}</p>}
//       {surveys.length > 0 && (
//         <ul>
//           {surveys.map((survey) => (
//             <li key={survey.id}>
//               Survey ID: {survey.id}, Title: {survey.title}
//               <div>
//                 <button onClick={() => handleEditSurvey(survey.id)}>Edit</button>
//                 <button onClick={() => handleDeleteSurvey(survey.id)}>Delete</button>
//               </div>
//             </li>
//           ))}
//         </ul>
//       )}

//       {/* Edit Modal */}
//       {showEditModal && (
//         <div className="edit-modal">
//           <h2>Edit Survey</h2>
//           <form>
//             <label>Title:</label>
//             <input
//               type="text"
//               value={editSurveyData.title}
//               onChange={(e) => setEditSurveyData({ ...editSurveyData, title: e.target.value })}
//             />

//             {/* Edit questions and answers */}
//             <h3>Edit Questions:</h3>
//             {editSurveyData.questions && editSurveyData.questions.map((question, index) => (
//               <div key={index}>
//                 <label>Edit Question {index + 1}:</label>
//                 <input
//                   type="text"
//                   value={question.text}
//                   onChange={(e) => {
//                     const editedQuestion = { ...question, text: e.target.value };
//                     handleEditQuestion(index, editedQuestion);
//                   }}
//                 />
//                 <label>Edit Answers:</label>
//                 {question.answers && question.answers.map((answer, answerIndex) => (
//                   <div key={answerIndex}>
//                     <input
//                       type="text"
//                       value={answer}
//                       onChange={(e) => {
//                         const editedAnswers = [...question.answers];
//                         editedAnswers[answerIndex] = e.target.value;
//                         const editedQuestion = { ...question, answers: editedAnswers };
//                         handleEditQuestion(index, editedQuestion);
//                       }}
//                     />
//                   </div>
//                 ))}
//               </div>
//             ))}

//             <button type="button" onClick={handleSaveEdit}>
//               Save
//             </button>
//             <button type="button" onClick={() => setShowEditModal(false)}>
//               Cancel
//             </button>
//           </form>
//         </div>
//       )}
//     </>
//   );
// };

// export default SurveysList;
import React, { useState, useEffect } from "react";
import axios from "axios";
import './surveysList.css';
import { useNavigate } from "react-router-dom";

const SurveysList = () => {
  const [surveys, setSurveys] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSurveys = async () => {
      try {
        const response = await axios.get('http://localhost:5095/api/Survey');
        setSurveys(response.data.$values);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchSurveys();
  }, []);

  const handleEditSurvey = async (surveyId) => {
    navigate('/EditQuestion', { state: { surveyId } });
  };

  const handleDeleteSurvey = async (surveyId) => {
    try {
      // Send a DELETE request to delete the survey
      await axios.delete(`http://localhost:5095/api/SurveyEdit/${surveyId}`);
      // Filter out the deleted survey from the surveys state
      const updatedSurveys = surveys.filter((survey) => survey.id !== surveyId);
      setSurveys(updatedSurveys);
    } catch (error) {
      console.error("Error deleting survey:", error.message);
    }
  };

  return (
    <div className="survey-container">
      <h5 className="surveysList-heading">List of Surveys Available:</h5>
      {loading && <p>Loading surveys...</p>}
      {error && <p>Error fetching surveys: {error.message}</p>}
      {surveys.length > 0 && (
        <div>
          {surveys.map((survey) => (
            <div
              key={survey.id}
              className="survey-tile"
              onClick={() => handleEditSurvey(survey.id)}
            >
              {/* <p>Survey ID: {survey.id}</p> */}
              <h6> {survey.title}</h6>
              <div className="button-container">
                <button onClick={(e) => { e.stopPropagation(); handleEditSurvey(survey.id) }}>Edit</button>
                <button onClick={(e) => { e.stopPropagation(); handleDeleteSurvey(survey.id) }}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SurveysList;
