import React, { useState, useEffect } from "react";
import styles from "./index.module.css";
import image from "../../../assets/images/Logo.png";
import { Link, useNavigate, useNavigation } from "react-router-dom";
import { CircularProgress, TextField } from "@mui/material";
import { Formik } from "formik";
import { AuthService } from "../../../utilities/Api";
import hand from "../../../assets/icons/waving.svg";
import { useDispatch } from "react-redux";
import { userData } from "../../../store/slices/userSlice";
import { login } from "../../../services/auth/index";
import LocalStorageService from "../../../utilities/LocalStorageService";
function Index() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [submit, setSubmit] = useState(false);
  return (
    <div className={styles.container}>
      <div className={styles.miniCont}>
        <img src={image} className={styles.image} />
      </div>
      <div className={styles.divider}></div>
      <div className={styles.miniCont}>
        <div className={styles.formContainer}>
          <div className={styles.Fheading__container}>
            <div className={styles.Fheading}>Welcome</div>
            <div>
              <img src={hand} />
            </div>
          </div>

          <div className={styles.Sheading}>
            Enter the world of happiness & Re-discover yourself through our
            unique app made with ❤️ for you.
          </div>

          <Formik
            initialValues={{ identifier: "" }}
            validate={(values) => {
              const errors = {};
              if (!values.identifier) {
                errors.identifier = "Required";
              } else if (
                !/^(?:\d{10}|\w+@\w+\.\w{2,3})$/.test(values.identifier)
              ) {
                errors.identifier = "Invalid credentials";
              }
              return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                setSubmit(true);
                login(values.identifier)
                  .then((res) => {
                    LocalStorageService.setId(res.id);
                    if (/^[6-9]\d{9}$/.test(values.identifier)) {
                      dispatch(userData({ mobile: values.identifier }));
                    } else if (
                      /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
                        values.identifier
                      )
                    ) {
                      dispatch(userData({ email: values.identifier }));
                    }
                    navigate("/otp");
                  })
                  .catch((err) => {
                    setSubmit(false);
                    console.log(err);
                  });
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
                    sx={{
                      "& label.Mui-focused": {
                        color: "#FBBECE",
                      },
                      "& .MuiInput-underline:before": {
                        borderBottomColor: "#FBBECE!important",
                      },
                      "& .MuiInput-underline:hover:before": {
                        borderBottomColor: "#FBBECE!important",
                      },
                      "& .MuiInput-underline:hover:": {
                        borderBottomColor: "#FBBECE!important",
                      },
                      "& .MuiInput-underline:hover:after": {
                        borderBottomColor: "#FBBECE!important",
                      },
                    }}
                    fullWidth
                    margin="normal"
                    id="standard-basic"
                    label="# Phone Number or Email Address"
                    variant="standard"
                    name="identifier"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.identifier}
                    inputProps={{ sx: { color: "#FBBECE" } }}
                    InputLabelProps={{ sx: { color: "#FBBECE" } }}
                  />
                  <div className={styles.form__error}>
                    {" "}
                    {errors.identifier &&
                      touched.identifier &&
                      errors.identifier}
                  </div>
                </div>
                <div className={styles.Theading}>
                  *if you are a corporate user, Kindly enter your corporate
                  email id.
                </div>
                <div className={styles.formbutton__container}>
                  {!submit ? (
                    <button type="submit" disabled={isSubmitting}>
                      Login
                    </button>
                  ) : (
                    <CircularProgress color="secondary" />
                  )}
                </div>
              </form>
            )}
          </Formik>

          <div className={styles.tc}>
            By continuing you accept our
            <br />
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://zariyaa.in/terms-and-conditions-2/"
            >
              <span
                style={{
                  cursor: "pointer",
                  color: "white",
                  fontStyle: "italic",
                  textDecoration: "underline",
                }}
              >
                Privacy policy & Terms of Use
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Index;
