import React, { useState, useEffect } from "react";
import styles from "./index.module.css";
import "../../../utilities/datePicker.css";
import dob from "../../../assets/icons/DOB.svg";
import { InputAdornment, MenuItem, TextField } from "@mui/material";
import WelcomePopup from "../popup";
import { Formik } from "formik";

import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import name from "../../../assets/icons/Name.svg";

import { updateDetails } from "../../../services/preferences";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../../../utilities/datePicker.css";
import { CalendarIcon } from "@mui/x-date-pickers";
function UserDetails() {
  const [id, setId] = useState("");
  const [inputType, setInputType] = useState("text");

  const handleFocus = () => {
    setInputType("date");
  };

  const handleBlur = (event) => {
    if (!event.target.value) {
      setInputType("text");
    }
  };
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [date, setDate] = useState("");
  const handleDateChange = (event) => {
    const dateVal = new Date(event.target.value);
    var date1 = Math.floor(dateVal?.$d / 1000.0);
    var date1 = Date.parse(dateVal) / 1000.0;
    console.log(date1);
    setDate(date1);
  };

  useEffect(() => {
    setId(localStorage.getItem("id"));
  }, [id]);

  return (
    <>
      <WelcomePopup />
      <div className={styles.container}>
        <div className={styles.minicontainer1}></div>
        <div className={styles.minicontainer2}>
          <div className={styles.Qheading}>
            Enter Your Details to help understand you better.
          </div>
          <div className={styles.formContainer}>
            <Formik
              initialValues={{}}
              validate={(values) => {
                const errors = {};
                if (!values.name) {
                  errors.name = "Required";
                }
                if (!values.gender) {
                  errors.gender = "Required";
                }

                return errors;
              }}
              onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                  setSubmitting(false);
                  updateDetails(values.name, date, values.gender)
                    .then((res) => {
                      if (res.status === 200) {
                        navigate("/onboarding/questionnare/1");
                      }
                    })
                    .catch((err) => {
                      console.log(err);
                    });
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
              }) => (
                <form onSubmit={handleSubmit}>
                  <div className={styles.textfield__container}>
                    <TextField
                      sx={{
                        width: "431px",
                        input: {
                          "&::placeholder": {
                            opacity: 1,
                          },
                        },
                        "& label.Mui-focused": {
                          color: "#FBBECE",
                        },
                        "& .MuiInput-underline:before": {
                          borderBottomColor: "#FBBECE!important",
                        },
                        "& .MuiInput-underline:after": {
                          borderBottomColor: "#FBBECE!important",
                        },
                        "& .MuiInput-underline:before": {
                          borderBottomColor: "#FBBECE!important",
                        },
                        "& .MuiInput-underline:hover:before": {
                          borderBottomColor: "#FBBECE!important",
                        },
                      }}
                      fullWidth
                      margin="normal"
                      id="input-with-icon-textfield"
                      placeholder="Please Enter Your Name"
                      variant="standard"
                      name="name"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.name}
                      inputProps={{ sx: { color: "#FBBECE" } }}
                      InputLabelProps={{ sx: { color: "#FBBECE" } }}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <img src={name} />
                          </InputAdornment>
                        ),
                      }}
                    />
                    {/*     <div className={styles.form__error}>
        {" "}
        {errors.identifier &&
          touched.identifier &&
          errors.identifier}
      </div> */}{" "}
                    {errors && <div>{errors.name}</div>}
                  </div>{" "}
                  <div className={styles.textfield__container__date}>
                    {/* <DatePicker
                      variant="standard"
                      onChange={onChange}
                      className={styles.datePicker}
                      popupClassName={styles.popup}
                      placeholder="Enter Your Birthday"
                      disabledDate={(current) => {
                        let customDate = dayjs().format("YYYY-MM-DD");
                        return (
                          current && current > dayjs(customDate, "YYYY-MM-DD")
                        );
                      }}
                    /> */}

                    {/* <DatePicker
                      onChange={onChange}
                      selected={date}
                      showIcon
                      toggleCalendarOnIconClick
                      placeholderText="Enter Your Birthday"
                      icon={<img src={dob} />}
                    /> */}

                    <input
                      type={inputType}
                      className={styles.date}
                      placeholder="Enter your Birthday"
                      onFocus={handleFocus}
                      onBlur={handleBlur}
                      onMouseOver={handleFocus}
                      onChange={handleDateChange}
                    />
                    <CalendarIcon sx={{ color: "#fbbece" }} />
                  </div>
                  <div className={styles.textfield__container}>
                    <TextField
                      sx={{
                        width: "431px",
                        "& label.Mui-focused": {
                          color: "#FBBECE",
                        },
                        "& .MuiInput-underline:after": {
                          borderBottomColor: "#FBBECE",
                        },
                        "& .MuiInput-underline:before": {
                          borderBottomColor: "#FBBECE",
                        },
                        "& .MuiInput-underline:hover:before": {
                          borderBottomColor: "#FBBECE",
                        },
                      }}
                      fullWidth
                      select
                      id="gender"
                      label="Please Enter Your Gender"
                      variant="standard"
                      name="gender"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.gender}
                      inputProps={{
                        sx: { color: "#FBBECE" },
                      }}
                      InputLabelProps={{
                        sx: { color: "#FBBECE", alignItems: "center" },
                      }}
                      startAdornment={
                        <InputAdornment position="start">
                          <img src={name} />
                        </InputAdornment>
                      }
                    >
                      <MenuItem key={"M"} value={"male"}>
                        Male
                      </MenuItem>
                      <MenuItem key={"F"} value={"female"}>
                        Female
                      </MenuItem>
                    </TextField>

                    {/*     <div className={styles.form__error}>
          {" "}
          {errors.identifier &&
            touched.identifier &&
            errors.identifier}
        </div> */}
                  </div>
                  <div className={styles.formbutton__container}>
                    <button type="submit" disabled={isSubmitting}>
                      Next
                    </button>
                  </div>
                </form>
              )}
            </Formik>
          </div>{" "}
        </div>
      </div>
    </>
  );
}

export default UserDetails;
