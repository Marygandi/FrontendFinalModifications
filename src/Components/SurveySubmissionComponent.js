import React, { useEffect, useRef, useState } from "react";
import MenuItem from '@mui/material/MenuItem';
import { connect, useSelector } from "react-redux";
import axios from 'axios';
import {
  fetchSurveys,
  fetchQuestions,
  submitSurvey,
} from "./surveySubmissionAction";
import RadioGroup from '@mui/material/RadioGroup';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import Checkbox from '@mui/material/Checkbox';
import './SurveyDropdown.css';

function SurveySubmissionComponent({
  surveys,
  questions,
  submissionSuccess,
  fetchSurveys,
  fetchQuestions,
  submitSurvey,
}) {
  const [selectedSurveyId, setSelectedSurveyId] = useState("");
  const [selectedMultipleChoiceAnswers, setSelectedMultipleChoiceAnswers] = useState([]);
  const [selectedRatingScaleAnswers, setSelectedRatingScaleAnswers] = useState([]);
  const [selectedQuestions, setSelectedQuestions] = useState({});
  const [surveyList, setSurveyList] = useState([]);
  const surveydata = useSelector(state => state);
  const [selectedValues, setSelectedValues] = useState([]);
  const [requestPayload,setRequestPayload]=useState([]);
const emailRef=useRef()
  const [mailAddressBar,setMailAddressBar]=useState(false);
  const [showEmailId,setShowEmailId]=useState(false);
  useEffect(() => {
   console.log('&&&&&&&&',requestPayload);
  });

  useEffect(() => {
    // Fetch surveys on component mount
    fetchSurveys();
  }, [fetchSurveys]);



  useEffect(() => {
    // Fetch questions when selectedSurveyId changes
    if (selectedSurveyId) {
      fetchQuestions(selectedSurveyId);
    }
  }, [selectedSurveyId, fetchQuestions]);
  useEffect(() => {
    const fetchSurveys = async () => {
      try {
        const response = await axios.get('http://localhost:5095/api/Survey');
        if (response.statusText == "OK") {
          setSurveyList(response?.data.$values)
        }

      } catch (error) {
        console.error('Error fetching surveys:', error.message);
      }
    };
    const fetchSurveyQuestions = async () => {
      try {
        const response = await axios.get(`http://localhost:5095/api/Survey/survey1/${selectedSurveyId}`);
        console.log("1",response);
        if (response.statusText == "OK") {
          // setSelectedQuestions(response?.data.questions.$values)
          //setSelectedAnswers(response?.data.$values.answers)
          const allQuestions = response?.data.questions.$values;

          // Extract answers for multiple-choice questions
          const multipleChoiceQuestions = allQuestions.filter(
            (question) => question.type === 'MultipleChoice'
          );
          const multipleChoiceAnswers = multipleChoiceQuestions.map(
            (question) => question.answers.$values
          );

          // Extract answers for rating scale questions
          const ratingScaleQuestions = allQuestions.filter(
            (question) => question.type === 'RatingScale'
          );
          const ratingScaleAnswers = ratingScaleQuestions.map(
            (question) => question.answers.$values
          );

          // Log the extracted answers


          // Set the survey questions to state
          setSelectedQuestions(allQuestions);
          setSelectedRatingScaleAnswers(ratingScaleAnswers);
          setSelectedMultipleChoiceAnswers(multipleChoiceAnswers);
        }



      } catch (error) {
        console.error('Error fetching surveys:', error.message);
      }
    };

    fetchSurveys();
    if (selectedSurveyId) {
      fetchSurveyQuestions();
    }
  }, [selectedSurveyId]);
  const var1 = surveyList.map((e) => e);

  const handleSurveySelect = (event) => {
    const surveyId = event.target.value;
    setSelectedSurveyId(surveyId);
    setShowEmailId(false);

  };

  const handleAnswerChange = (questionId, answerId, value) => {
    setSelectedMultipleChoiceAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: { ...prevAnswers[questionId], [answerId]: value },
    }));
  };

  const handleSubmit = () => {
    const submissionData = {
      Username: "mouni", // Hardcoded for now, replace with dynamic value
      SurveyId: selectedSurveyId,
      QuestionResponses: 
      //Object.entries(selectedMultipleChoiceAnswers).map(([questionId, answerId]) => ({
        // QuestionId: parseInt(questionId, 10),
        // AnswerId: parseInt(answerId, 10),
        requestPayload,
      //})),
    };
    setShowEmailId(true)
    // Submit survey
    submitSurvey(submissionData);
  };
  /*const var=surveyList?.$values?.map((survey) => (
          
    console.log(5,survey)
  ))*/
const handleData=(que,ans)=>{
  setRequestPayload((prevPayload) => [
    ...prevPayload,
    {
      QuestionId: que,
      AnswerId: ans,
    },
  ]);
}

      

const handleSendEmail=async()=>{
const emailid=emailRef.current.value;
console.log(emailid)

try{
  const response = await axios.post(`http://localhost:5095/api/Survey/SendSurveyByEmail`,{
    "surveyNumber": selectedSurveyId,
  "userEmail": emailid
  });
  console.log("email sent successfully")
  console.log(response)
}catch(e){
  console.log("error",e)
}

emailRef.current.value=""
alert("email sent successfully")
}

const handleMultiSelectData = (questionId, selectedValue) => {
  // Find the index of the questionId in the selectedValues array
  const questionIndex = selectedValues.findIndex((item) => item.questionId === questionId);

  if (questionIndex !== -1) {
    // If the questionId is found, update the selectedValues array
    setSelectedValues((prevValues) => {
      const newValues = [...prevValues];
      newValues[questionIndex].selectedValues = prevValues[questionIndex].selectedValues.includes(selectedValue)
        ? prevValues[questionIndex].selectedValues.filter((value) => value !== selectedValue)
        : [...prevValues[questionIndex].selectedValues, selectedValue];
      return newValues;
    });
  } else {
    // If the questionId is not found, add a new entry to the selectedValues array
    setSelectedValues((prevValues) => [
      ...prevValues,
      { questionId, selectedValues: [selectedValue] },
    ]);
  }

  // Update requestPayload state with the selected values
  const selectedValuesOutput = selectedValues.map((item) => ({
    QuestionId: item.questionId,
    AnswerId: item.selectedValues.join(', '),
  }));
  setRequestPayload(selectedValuesOutput);
};

  console.log('selectedMultipleChoiceAnswers>>>>', selectedMultipleChoiceAnswers);
  return (
    <div className="survey-submission-container">
      <label className="survey-subheading">Select Survey:</label>
      <select onChange={handleSurveySelect} className="survey-select">
        
        {surveyList?.map((survey) => (

          <option key={survey.id} value={survey.id}>
            {survey.title}
          </option>
        ))}

      </select>
      { !showEmailId && selectedQuestions.length > 0 && (
        <div className="survey-questionsCard">
          <h5>Survey Questions:</h5>
          {selectedQuestions.map((question,i) => (
            <div key={question.id} className="survey-subMenu">
              <p className="survey-question">{i+1}. {question.text}</p>

              {/* radio buttons */}
              {(question.type === "RatingScale" && selectedRatingScaleAnswers) && (
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                  onChange={(event) => {
                    handleData(question.id, event.target.value);
                  }}
                >
                  {selectedRatingScaleAnswers[0]?.map(ratingLabel => {
                    return (<FormControlLabel value={ratingLabel.text} control={<Radio />} label={ratingLabel.text} />)
                  })}
                </RadioGroup>
              )}

              {/* multichoice */}
              {(question.type === "MultipleChoice" && selectedMultipleChoiceAnswers) && (
                selectedMultipleChoiceAnswers[0]?.map((label, index) => {
                  console.log(label, index);
                  return (<div key={index}>
                    <FormGroup onChange={(event) => {
                  handleMultiSelectData(question.id, event.target.value);
                }}>
                      <FormControlLabel value={label.text} control={<Checkbox />} label={label.text} />
                    </FormGroup>
                  </div>)
                }
                )

              )}

              {question.type === "OpenText" && (
                <input
                  type="text"
                  placeholder="Enter your answer"
                  onChange={(e) => handleAnswerChange(question.id, 1, e.target.value)}
                />
              )}

            </div>


          ))}
          <button onClick={handleSubmit}>Submit Survey</button>
        </div>
      )}

      { showEmailId &&
      <>
        <p style={{color:'#FF8C40',
          textAlign: 'center',
          fontSize: 'larger',
          background: 'antiquewhite',
          padding: '14px',
          margin: '15px 0px'
      }}>Survey submitted successfully!</p>

        <br/>
        <p>Would you like to Share the survey to others ?! </p>
          <button onClick={()=>setMailAddressBar(true)}>Share</button>
          <br/>

          <input type="email" ref={emailRef} placeholder="enter email"/>
          <button onClick={handleSendEmail}>send</button>
      </>}
    </div>
  );
}

const mapStateToProps = (state) => {

  return {
    surveys: state.surveySubmission.surveys,
    questions: state.surveySubmission.questions,
    submissionSuccess: state.surveySubmission.submissionSuccess,
  };
};
// Inside your component


const mapDispatchToProps = {
  fetchSurveys,
  fetchQuestions,
  submitSurvey,
};

export default connect(mapStateToProps, mapDispatchToProps)(SurveySubmissionComponent);