import React, { useState } from "react";
import styles from "../AppointmentDetails/index.module.css";
import Calendar from "react-calendar";
import "./calendar.css";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  postAppointment,
  postFollowAppointment,
} from "../../../services/appointment";
import { useDispatch, useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { TextField } from "@mui/material";
import { Formik } from "formik";
import { createPayment } from "../../../services/payment";
import toast, { Toaster } from "react-hot-toast";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  p: 4,
  borderRadius: "10px",
};
const timings = [
  {
    time: "10:00AM",
    value: "10:00:00",
    Endvalue: "11:00:00",
  },
  {
    time: "11:00AM",
    value: "11:00:00",
    Endvalue: "12:00:00",
  },
  {
    time: "12:00PM",
    value: "12:00:00",
    Endvalue: "13:00:00",
  },
  {
    time: "1:00PM",
    value: "13:00:00",
    Endvalue: "14:00:00",
  },
  {
    time: "2:00PM",
    value: "14:00:00",
    Endvalue: "15:00:00",
  },
  {
    time: "3:00PM",
    value: "15:00:00",
    Endvalue: "16:00:00",
  },
  {
    time: "4:00PM",
    value: "16:00:00",
    Endvalue: "17:00:00",
  },
];
const AppointmentTimingsComponent = () => {
  const userdetails = useSelector((state) => state?.userDetails);
  const { Eid } = useParams();
  const [selectedDiv, setSelectedDiv] = useState(0);
  const [time, setTime] = useState(timings[0].value);
  const [etime, setEtime] = useState(timings[0].Endvalue);
  const [time1, setTime1] = useState(timings[0].time);
  const [date, setDate] = useState(new Date());
  const [data, setData] = useState();
  const [data2, setData2] = useState();
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [email, setEmail] = useState(userdetails?.data?.contacts?.email);

  const handleDivClick = (index) => {
    setSelectedDiv(index);
    setTime(timings[index].value);
    setEtime(timings[index].Endvaluevalue);
    setTime1(timings[index].time);
  };
  useEffect(() => {
    let val = localStorage.getItem("appointment");
    let value = JSON.parse(val);
    setData(value);

    let val2 = localStorage.getItem("appointmentDetails");
    let value2 = JSON.parse(val2);
    setData2(value2);
  }, []);

  console.log(email);
  const handleSubmit = () => {
    data.startDate = date.toISOString().split("T")[0];
    data.startTime = time;
    data.endTime = etime;
    data.email = email;
    data2.time = time1;
    data2.date = date.toISOString().split("T")[0];
    let string2 = JSON.stringify(data2);
    let string = JSON.stringify(data);
    localStorage.setItem("appointment", string);
    localStorage.setItem("appointmentDetails", string2);

    if (email === undefined) {
      handleOpen();
    } else {
      if (Eid) {
        postFollowAppointment(data, Eid)
          .then((res) => {
            // navigate("/appointment/confirmation");
            if (res?.data?.status === "PAYMENT_INITIATED") {
              const dataset = {
                consultationId: res.data._id,
                amount: 999,
                purpose: "payment",
                buyer_name: userdetails?.data?.name,
                email: email,
                phone: userdetails?.data?.phone,
                redirect_url: "http://localhost:3000/appointment/confirmation",
              };
              createPayment(dataset)
                .then((res) => {
                  window.open(res?.data?.paymentLink);
                })
                .catch((err) => {
                  console.log(err.response);
                });
            }
            if (res?.data?.status === "FAILED") {
              toast.error(res?.data?.reason);
            }
          })
          .catch((err) => {
            toast.error(err?.response?.data?.reason, { duration: 3000 });
          });
      } else {
        postAppointment(data)
          .then((res) => {
            // navigate("/appointment/confirmation");
            if (res?.data?.status === "PAYMENT_INITIATED") {
              const dataset = {
                consultationId: res.data._id,
                amount: 999,
                purpose: "payment",
                buyer_name: userdetails?.data?.name,
                email: email,
                phone: userdetails?.data?.phone,
                redirect_url: "http://localhost:3000/appointment/confirmation",
              };
              createPayment(dataset)
                .then((res) => {
                  window.open(res?.data?.paymentLink);
                })
                .catch((err) => {
                  console.log(err.response);
                });
            }
          })
          .catch((err) => {
            toast.error(err?.response?.data?.reason, { duration: 3000 });
          });
      }
    }
  };

  return (
    <div className={styles.mainContainer}>
      <Toaster />
      <div>
        <Modal
          open={open}
          // onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Enter Your Email address
            </Typography>

            <Formik
              initialValues={{ email: "" }}
              validate={(values) => {
                const errors = {};
                if (!values.email) {
                  errors.identifier = "Required";
                } else if (
                  !/^(?:\d{10}|\w+@\w+\.\w{2,3})$/.test(values.email)
                ) {
                  errors.email = "Invalid email";
                }
                return errors;
              }}
              onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                  console.log(values.email);
                  setEmail(values.email);

                  handleClose();
                  handleSubmit();
                  setSubmitting(false);
                }, 400);
              }}
            >
              {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
                /* and other goodies */
              }) => (
                <form onSubmit={handleSubmit}>
                  <div className={styles.textfield__container}>
                    <TextField
                      fullWidth
                      margin="normal"
                      id="standard-basic"
                      label="#Email Address"
                      variant="standard"
                      name="email"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.identifier}
                    />
                    <div className={styles.form__error}>
                      {" "}
                      {errors.email && touched.email && errors.email}
                    </div>
                  </div>
                  <div className={styles.formbutton__container}>
                    <button type="submit" disabled={isSubmitting}>
                      Submit
                    </button>
                  </div>
                </form>
              )}
            </Formik>
          </Box>
        </Modal>
      </div>
      <div className={styles.mainHeading}>Help us Help you !</div>
      <div className={styles.secondContainer}>
        <div className={styles.progressContainer}>
          <div className={styles.progressCard}>
            Details
            <div className={styles.filled}></div>
          </div>
          <div className={styles.progressCard}>
            Date & Time
            <div className={styles.filled}></div>
          </div>
          <div className={styles.progressCard}>
            Confirmation
            <div className={styles.empty}></div>
          </div>
        </div>
        <div className={styles.formContainer}>
          <div className={styles.formHeading}>
            Choose <span>Date & Time</span>
          </div>
          <div className={styles.formOptions}>
            <div className={styles.fieldContainer}>
              <div className={styles.fieldHeading}>
                At which date would like the appointment ?
              </div>
              <div className={styles.fieldAnswers}>
                <Calendar
                  className="react-calendar"
                  onChange={setDate}
                  value={date}
                />
              </div>
            </div>{" "}
            <div className={styles.fieldContainer}>
              <div className={styles.fieldHeading}>
                At what time would like the appoinment ?
              </div>
              <div className={styles.fieldAnswers__timings}>
                {timings.map((data, index) => (
                  <div
                    key={index}
                    className={
                      selectedDiv === index ? styles.selected : styles.timings
                    }
                    onClick={() => handleDivClick(index)}
                  >
                    {data.time}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div>
            <button className={styles.submitButton} onClick={handleSubmit}>
              CONFIRM APPOINTMENT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentTimingsComponent;
