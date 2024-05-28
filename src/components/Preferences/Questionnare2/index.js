import React, { useState, useEffect } from "react";
import styles from "../Questionnare/index.module.css";
import QuestionCard from "../QuestionCard";
import { Category } from "../../../utilities/Api";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { getQuestions } from "../../../services/preferences";
const Questionnare2 = () => {
  const [id, setId] = useState("");
  const [answers, setAnswers] = useState([]);
  const [question, setQuestion] = useState([]);
  const [choice, setChoice] = useState("");
  const [data, setData] = useState();
  const navigate = useNavigate();
  const ans = [];
  useEffect(() => {
    setId(localStorage.getItem("id"));
  }, [id]);

  useEffect(() => {
    let val = localStorage.getItem("answers");
    let value = JSON.parse(val);
    setData(value);
  }, []);

  const handleClick = (id) => {
    if (!ans.includes(id)) {
      ans.push(id);
    } else {
      ans.splice(ans.indexOf(id), 1);
    }

    if (ans.length > question.maxChoice) {
      toast.error(`Please Choose any ${question.maxChoice}`, {
        duration: 1000,
      });
    }
    console.log(ans);
  };

  useEffect(() => {
    if (question.maxChoice === 1) {
      setChoice("ONE");
    } else if (question.maxChoice === 2) {
      setChoice("TWO");
    }
  }, [question]);

  const handleSubmit = (e) => {
    console.log("mai chala");
    if (ans.length != question.maxChoice) {
      toast.error(`Please Choose any ${question.maxChoice}`);
      return;
    } else if (ans.length === question.maxChoice) {
      let d = {
        questionID: question._id,
        answers: ans,
      };

      data.push(d);

      let string = JSON.stringify(data);
      localStorage.setItem("answers", string);
      navigate("/onboarding/questionnare/3");
    }
  };

  useEffect(() => {
    getQuestions()
      .then((res) => {
        if (res.status === 200) {
          console.log(res);
          setQuestion(res?.data?.data[1]);
          setAnswers(res?.data?.data[1]?.answers);
        }
      })
      .catch((err2) => {
        console.log(err2);
      });
  }, []);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.minicontainer1}></div>
        <div className={styles.minicontainer2}>
          <div className={styles.Qheading}>{question.query}</div>
          <div className={styles.choices}>Choose any {choice}</div>

          <div>
            {answers.map((answer) => (
              <div key={answer._id} onClick={(e) => handleClick(answer._id)}>
                <QuestionCard
                  heading={answer.answer}
                  id={answer._id}
                  subheading={answer.description}
                  image={answer.imageURL}
                />
              </div>
            ))}
          </div>

          <div className={styles.formbutton__container}>
            <button onClick={(e) => handleSubmit(e)}>Next</button>
          </div>
        </div>
        <Toaster />
      </div>
    </>
  );
};

export default Questionnare2;
