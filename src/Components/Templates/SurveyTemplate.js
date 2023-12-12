// import React, { useState } from "react";
// import axios from "axios";
// import { TextField, FormControl, InputLabel, Select, MenuItem, Button } from "@mui/material";
// import { Link } from "react-router-dom";

// function SurveyButton({ label, to }) {
//   return (
//     <Link to={to}>
//       <Button>{label}</Button>
//     </Link>
//   );
// }

// function SurveyTemplate() {
//   const initialQuestion = {
//     text: "",
//     type: "RatingScale",
//     answers: [{ id: 1, text: "" }, { id: 2, text: "" }],
//   };

//   const [title, setTitle] = useState("Customer Satisfaction Survey");
//   const [questions, setQuestions] = useState([initialQuestion]);
//   const [error, setError] = useState("");

//   const addQuestion = () => {
//     setQuestions([...questions, { ...initialQuestion }]);
//   };

//   const handleQuestionChange = (index, field, value) => {
//     const updatedQuestions = [...questions];
//     updatedQuestions[index] = { ...updatedQuestions[index], [field]: value };
//     setQuestions(updatedQuestions);
//   };

//   const handleAnswerChange = (questionIndex, answerIndex, value) => {
//     const updatedQuestions = [...questions];
//     updatedQuestions[questionIndex].answers[answerIndex].text = value;
//     setQuestions(updatedQuestions);
//   };

//   const addAnswer = (questionIndex) => {
//     const updatedQuestions = [...questions];
//     const newAnswerId = updatedQuestions[questionIndex].answers.length + 1;
//     updatedQuestions[questionIndex].answers.push({ id: newAnswerId, text: "" });
//     setQuestions(updatedQuestions);
//   };

//   const removeAnswer = (questionIndex, answerIndex) => {
//     const updatedQuestions = [...questions];
//     updatedQuestions[questionIndex].answers.splice(answerIndex, 1);
//     setQuestions(updatedQuestions);
//   };

//   const removeQuestion = (index) => {
//     const updatedQuestions = [...questions];
//     updatedQuestions.splice(index, 1);
//     setQuestions(updatedQuestions);
//   };

//   const createSurvey = async () => {
//     try {
//       const response = await axios.post("http://localhost:5095/api/Survey", {
//         title: title,
//         questions: questions.map((q) => {
//           const questionData = {
//             text: q.text,
//             type: q.type,
//           };

//           // Only include answers if the question type is not "OpenText"
//           if (q.type !== "OpenText") {
//             questionData.answers = q.answers.map((a) => ({
//               id: a.id,
//               text: a.text,
//             }));
//           }

//           return questionData;
//         }),
//       });

//       console.log("template",response.data);
//       // Handle success, redirect, show a success message, etc.
//     } catch (error) {
//       console.error(error);
//       setError("Error creating survey. Please try again.");
//     }
//   };

//   return (
//     <div className="">
//       <h3 className="create-survey-heading">Survey Template</h3>
//       {error && <div className="error">{error}</div>}
//       <div className="create-survey-card">
//         <label>
//           <h6>Title:</h6>
//         </label>
//         <TextField
//           type="text"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           style={{ width: "60%" }}
//         />

//         <div>
//           <label>
//             <h6>Questions:</h6>
//           </label>
//           {questions.map((q, questionIndex) => (
//             <div key={questionIndex} className="question-container">
//               <TextField
//                 type="text"
//                 placeholder="Enter your question"
//                 value={q.text}
//                 style={{ width: "60%" }}
//                 onChange={(e) =>
//                   handleQuestionChange(questionIndex, "text", e.target.value)
//                 }
//               />
//               &nbsp; &nbsp; &nbsp;
//               <InputLabel
//                 style={{
//                   color: "#333",
//                   fontSize: "1rem",
//                   fontStyle: "cursive",
//                 }}
//               >
//                 Question Type
//               </InputLabel>
//               <FormControl>
//                 <Select
//                   value={q.type}
//                   onChange={(e) =>
//                     handleQuestionChange(questionIndex, "type", e.target.value)
//                   }
//                   style={{ width: "100%" }}
//                 >
//                   <MenuItem value="RatingScale">Rating Scale</MenuItem>
//                   <MenuItem value="MultipleChoice">Multiple Choice</MenuItem>
//                   <MenuItem value="OpenText">Open Text</MenuItem>
//                 </Select>
//               </FormControl>
//               <br />
//               {q.type !== "OpenText" &&
//                 q.answers.map((a, answerIndex) => (
//                   <div key={answerIndex} className="answer-container">
//                     <TextField
//                       style={{ width: "60%" }}
//                       type="text"
//                       placeholder={`Enter answer ${answerIndex + 1}`}
//                       value={a.text}
//                       onChange={(e) =>
//                         handleAnswerChange(
//                           questionIndex,
//                           answerIndex,
//                           e.target.value
//                         )
//                       }
//                     />
//                     <button
//                       type="button"
//                       onClick={() =>
//                         removeAnswer(questionIndex, answerIndex)
//                       }
//                       style={{ width: "fit-content" }}
//                     >
//                       Remove Answer
//                     </button>
//                   </div>
//                 ))}
//               <br />
//               {q.type !== "OpenText" && (
//                 <button
//                   type="button"
//                   onClick={() => addAnswer(questionIndex)}
//                   className="add-btn"
//                 >
//                   Add Answer
//                 </button>
//               )}
//               <br />
//               <button
//                 type="button"
//                 onClick={() => removeQuestion(questionIndex)}
//                 className="remove-btn"
//               >
//                 Remove Question
//               </button>
//             </div>
//           ))}
//           <button
//             type="button"
//             onClick={addQuestion}
//             className="add-btn"
//           >
//             Add Question
//           </button>
//         </div>

//         <Button className="create-survey-btn" onClick={createSurvey}>
//           Create Survey
//         </Button>

//         {/* Use the SurveyButton component here */}
//         <SurveyButton label="Add Survey" to="/add-survey" />
//       </div>
//     </div>
//   );
// }

// export default SurveyTemplate;
