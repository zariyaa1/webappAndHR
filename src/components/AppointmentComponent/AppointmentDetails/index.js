import React, { useState, useEffect } from "react";
import styles from "./index.module.css";
import { TextField } from "@mui/material";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

import { getExpert } from "../../../services/Expert";
import { getUserById } from "../../../services/User";
const AppointmentDetailsComponent = () => {
  const { type } = useParams();
  const { Eid } = useParams();
  const navigate = useNavigate();
  const [id, setId] = useState("");
  const [one, setOne] = useState(true);
  const [two, setTwo] = useState(true);
  const [three, setThree] = useState(true);
  const [number, setNumber] = useState("");
  const [name, setName] = useState("");
  useEffect(() => {
    setId(localStorage.getItem("id"));
  }, [id]);

  useEffect(() => {
    getExpert(Eid)
      .then((res) => {
        getUserById(res.data.userId)
          .then((res) => {
            setName(res?.data?.name);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [Eid]);

  useEffect(() => {
    if (type === "healer") {
      setOne(true);
    } else {
      setOne(false);
    }
  }, [type]);

  function handleChange(value, index) {
    if (/^(?:\d{10}|\w+@\w+\.\w{2,3})$/.test(value)) {
      setNumber(value);
    } else {
      setNumber("");
    }
  }

  const handleSubmit = () => {
    if (number === "") {
      toast.error("Please enter a valid mobile number", { duration: "1000" });
      return;
    }
    let data = {
      userId: id,
      type: one ? "healer" : "Psychologist",
      modeOfConsultation: three ? "voiceCall" : "videoCall",
      phone: number,
    };
    let data2 = {
      type: one ? "healer" : "Psychologist",
      modeOfConsultation: three ? "Voice Call" : "Video Call",
      phone: number,
      whom: two ? "Myself" : "Family Member",
    };
    let string = JSON.stringify(data);
    let string2 = JSON.stringify(data2);

    localStorage.setItem("appointment", string);
    localStorage.setItem("appointmentDetails", string2);
    if (Eid) {
      navigate(`/appointment/details/timings/${Eid}`);
    } else {
      navigate(`/appointment/details/timings`);
    }
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.mainHeading}>Help us Help you !</div>
      <div className={styles.secondContainer}>
        <div className={styles.progressContainer}>
          <div className={styles.progressCard}>
            Details
            <div className={styles.filled}></div>
          </div>
          <div className={styles.progressCard}>
            Date & Time
            <div className={styles.empty}></div>
          </div>
          <div className={styles.progressCard}>
            Confirmation
            <div className={styles.empty}></div>
          </div>
        </div>
        <div className={styles.formContainer}>
          <div className={styles.formHeading}>
            Enter Your <span>Details</span>
          </div>
          {Eid && (
            <div className={styles.formHeading2}>
              You are booking a follow-up Appointment with <span> {name}</span>{" "}
              who is a <span>{type}</span>
            </div>
          )}
          <div className={styles.formOptions}>
            {!Eid && (
              <div className={styles.fieldContainer}>
                <div className={styles.fieldHeading}>
                  With Whom would you like to connect?
                </div>
                <div className={styles.fieldAnswers}>
                  <div
                    className={
                      one ? styles.answerActive : styles.answerUnactive
                    }
                    onClick={(e) => setOne(true)}
                  >
                    Healer
                  </div>
                  <div
                    className={
                      !one ? styles.answerActive : styles.answerUnactive
                    }
                    onClick={(e) => setOne(false)}
                  >
                    Psychologist
                  </div>
                </div>
              </div>
            )}
            <div className={styles.fieldContainer}>
              <div className={styles.fieldHeading}>
                For whom is the appoinment ?
              </div>
              <div className={styles.fieldAnswers}>
                <div
                  className={two ? styles.answerActive : styles.answerUnactive}
                  onClick={(e) => setTwo(true)}
                >
                  Myself
                </div>
                <div
                  className={!two ? styles.answerActive : styles.answerUnactive}
                  onClick={(e) => setTwo(false)}
                >
                  Family Member
                </div>
              </div>
            </div>{" "}
            <div className={styles.fieldContainer}>
              <div className={styles.fieldHeading}>
                Preferred Mode of Connect ?
              </div>
              <div className={styles.fieldAnswers}>
                <div
                  key="one"
                  className={
                    three ? styles.answerActive : styles.answerUnactive
                  }
                  onClick={(e) => setThree(true)}
                >
                  Voice Call
                </div>
                <div
                  className={
                    !three ? styles.answerActive : styles.answerUnactive
                  }
                  onClick={(e) => setThree(false)}
                >
                  Video Call
                </div>
              </div>
            </div>
            <div className={styles.fieldContainer}>
              <div className={styles.textfield}>
                <TextField
                  sx={{
                    "& label.Mui-focused": {
                      color: "#C2478A",
                      fontWeight: "600",
                    },
                    "& .MuiInput-underline:after": {
                      borderBottomColor: "#FBBECE",
                    },
                    "& .MuiInput-underline:before": {
                      borderBottomColor: "#FBBECE",
                    },
                    marginTop: "15px",
                    padding: 0,
                  }}
                  fullWidth
                  type="number"
                  margin="normal"
                  id="standard-basic"
                  label="# Please Enter Your Phone Number"
                  variant="standard"
                  name="identifier"
                  // onChange={handleChange}
                  // onBlur={handleBlur}
                  // value={values.identifier}
                  inputProps={{ sx: { color: "#C2478A", fontWeight: "600" } }}
                  InputLabelProps={{
                    sx: { color: "#C2478A", fontWeight: "600" },
                  }}
                  onChange={(e) => handleChange(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div>
            <button className={styles.submitButton} onClick={handleSubmit}>
              SELECT DATE & TIME
            </button>
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default AppointmentDetailsComponent;
