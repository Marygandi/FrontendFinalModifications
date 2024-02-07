import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import "./surveysList.css";

function EditQuestion() {
  const location = useLocation();
  const { surveyId } = location.state || {};
  const [qid, setQid] = useState("");
  const [sid, setSid] = useState(surveyId);
  const [questions, setQuestions] = useState([]);
  const [options, setOptions] = useState([]);
  const [question, setQuestion] = useState("");
  const [type, setType] = useState("");
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    getques();
  }, []);

  const getques = () => {
    axios.get(`http://localhost:5095/api/Survey/survey1/${surveyId}`)
      .then(response => {
        setQuestions(response.data.questions.$values);
        console.log(questions);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        console.log(sid);
      });
  }

  const updateQuestion = () => {
    const update = {
      text: question,
      type: type,
      answers: options
    }

    axios.put(`http://localhost:5095/api/SurveyEdit/${surveyId}/Questions/${qid}`, update, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        var result = response.data;
        console.log(response.data);
        alert("success");
      })
      .catch(err => {
        console.error(err);
        alert(err);
      });

    console.log(question);
    console.log(type);
    console.log(options);
    console.log(sid);
    console.log(qid);
    setQid("");
    setSid("");
    setQuestion("");
    setType("");
    setOptions([]);
  }

  const handleInputChange = (index, value, type, qid, sid) => {
    const newQuestions = [...questions];
    newQuestions[index].text = value;
    setQuestion(value);
    setType(type);
    setQid(qid);
    setSid(sid);
    setQuestions(newQuestions);
  };

  const handleAnswerChange = (questionIndex, ansIndex, ansText) => {
    const updatedQuestions = [...questions];
    updatedQuestions[questionIndex].answers.$values[ansIndex] = { text: ansText };
    setQuestions(updatedQuestions);
  };

  const answerSet = (ans) => {
    setOptions((prevOptions) => [...prevOptions, { text: ans }]);
    console.log(ans);
  };

  return (
    <div>
      {questions.map((ques, questionIndex) => (
        <div key={ques.id}>
          <div>
            <h5>Question {ques.id}</h5>
            <input
              value={ques.text || ''}
              onChange={(e) => handleInputChange(questionIndex, e.target.value, ques.type, ques.id, ques.surveyId)}
            />
          </div>
          {ques.answers.$values.map((ans, ansIndex) => (
            <div key={ans.id}>
              <input
                value={ans.text}
                onChange={(e) => handleAnswerChange(questionIndex, ansIndex, e.target.value)}
              />
            </div>
          ))}
          <button className="btn btn-primary" onClick={updateQuestion}>Update</button>
        </div>
      ))}
    </div>
  );
}

export default EditQuestion;
