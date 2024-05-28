import React, { useState, useEffect } from "react";
import styles from "../Questionnare/index.module.css";
import QuestionCard from "../QuestionCard";

import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { getQuestions, submitQuestions } from "../../../services/preferences";
import { getUserPref, updateUserPref } from "../../../services/User";

const Questionnare4 = () => {
  const [id, setId] = useState("");
  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState([]);
  const [question, setQuestion] = useState([]);
  const [choice, setChoice] = useState("");
  const [check, setCheck] = useState(false);
  const [err, Seterr] = useState(false);
  const [data, setData] = useState();
  const navigate = useNavigate();
  const ans = [];
  useEffect(() => {
    setId(localStorage.getItem("id"));
  }, [id]);

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
  };
  useEffect(() => {
    let val = localStorage.getItem("answers");
    let value = JSON.parse(val);
    setData(value);
  }, []);

  useEffect(() => {
    if (question.maxChoice === 1) {
      setChoice("ONE");
    } else if (question.maxChoice === 2) {
      setChoice("TWO");
    }
  }, [question]);

  useEffect(() => {
    getQuestions()
      .then((res) => {
        if (res.status === 200) {
          setQuestion(res?.data?.data[3]);
          setAnswers(res?.data?.data[3]?.answers);
        }
      })
      .catch((err2) => {
        console.log(err2);
      });

    getUserPref()
      .then((res) => {
        if (res.status === 200) {
          setCheck(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleSubmit = (e) => {
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

      if (check) {
        console.log("hi");
        updateUserPref(data)
          .then((res) => {
            if (res.status === 200) {
              toast.success("Preferences updated successfully");
              navigate("/");
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        submitQuestions(data)
          .then((res) => {
            if (res.status === 201) {
              navigate("/");
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  };

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

export default Questionnare4;
