import React, { useEffect, useRef, useState } from "react";
import styles from "./index.module.css";
import image from "../../../assets/images/Logo.png";
import { Formik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import {
  AuthService,
  Category,
  GetData,
  PostData,
} from "../../../utilities/Api";
import { otp, token } from "../../../services/auth";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { userData } from "../../../store/slices/userSlice";
import LocalStorageService from "../../../utilities/LocalStorageService";
import { checkPreferences } from "../../../services/preferences";
import { userDetails } from "../../../store/slices/userDetailsSlice";

const Otp__Component = () => {
  const [id, setId] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [key, setKey] = useState("");
  const user = useSelector((state) => state?.user);
  const userdetails = useSelector((state) => state?.userDetails);
  const [seconds, setSeconds] = useState(120);
  const [disable, setDisable] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [otpvalue, setOtpvalue] = useState(new Array(4).fill(""));
  const [otpError, setOtpError] = useState(null);
  const otpBoxReference = useRef([]);
  const [restart, setRestart] = useState(false);

  useEffect(() => {
    if (otpBoxReference.current[0]) {
      otpBoxReference.current[0].focus();
    }
  }, []);

  function handleChange(value, index) {
    if (isNaN(value)) return;
    // let newArr = [...otpvalue];
    // newArr[index] = value;
    // setOtpvalue(newArr);

    const newArr = [...otpvalue];
    newArr[index] = value.substring(value.length - 1);
    setOtpvalue(newArr);
    const combinedOtp = newArr.join("");
    if (combinedOtp.length === 4) {
      // handleSubmit(combinedOtp);
    }
    if (value && index < 3) {
      otpBoxReference.current[index + 1].focus();
    }
  }

  function handleBackspaceAndEnter(e, index) {
    if (e.key === "Backspace" && !e.target.value && index > 0) {
      otpBoxReference.current[index - 1].focus();
    }
    if (e.key === "Enter" && e.target.value && index < 3) {
      otpBoxReference.current[index + 1].focus();
    }
  }

  const handleSubmit = (combinedOtp) => {
    {
      if (otpvalue.join("").length < 4) {
        toast.error("Enter 4 digit OTP", {
          duration: 1000,
        });
        return;
      }

      setIsSubmitting(true);
      otp(otpvalue.join(""))
        .then((response) => {
          if (response.status === 200) {
            LocalStorageService.setToken(response.data);
            dispatch(userDetails(response.data.user));
            // console.log(userdetails);
            if (
              response?.data?.user?.roles[0]?.name === "corporateAdmin" ||
              response?.data?.user?.roles[1]?.name === "corporateAdmin"
            ) {
              navigate("/dashboard/admin");
              return;
            }
            checkPreferences()
              .then((res) => {
                if (res.status === 200) {
                  navigate("/");
                }
              })
              .catch((err2) => {
                console.log(err2);
                if (err2.response.status === 404) {
                  navigate("/onboarding/details");
                } else {
                  toast.error(err2.response.data.reason);
                }
              });
          }
        })
        .catch((err) => {
          toast.error(err?.response?.data?.message);
        });
    }

    setIsSubmitting(false);
  };

  useEffect(() => {
    // Exit early if countdown is finished
    if (seconds <= 0) {
      setDisable(false);
      if (restart) {
        setDisable(false);
        setSeconds(120);
      }
      return;
    }

    // Set up the timer
    const timer = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds - 1);
    }, 1000);

    // Clean up the timer
    return () => clearInterval(timer);
  }, [seconds, restart, disable]);

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (timeInSeconds % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  useEffect(() => {
    setId(localStorage.getItem("id"));
  }, [id]);

  useEffect(() => {
    setKey(user?.data?.mobile ? user?.data?.mobile : user?.data?.email);
  }, []);

  const handleResendOtp = () => {
    if (!disable) {
      setTimeout(() => {
        {
          otpvalue.fill("");
          AuthService.post(`/${key}/otp`, {
            signup: true,
          }).then((response) => {
            setRestart(true);
            localStorage.setItem("id", response.data.id);
            if (/^[6-9]\d{9}$/.test(key)) {
              dispatch(userData({ mobile: key }));
            } else if (/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(key)) {
              dispatch(userData({ email: key }));
            }
          });
        }
      }, 400);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.miniCont}>
        <img src={image} className={styles.image} />
      </div>
      <div className={styles.divider}></div>
      <div className={styles.miniCont}>
        <div className={styles.formContainer}>
          <div className={styles.Fheading__container}>
            <div className={styles.Fheading}>Enter OTP</div>
          </div>
          <div className={styles.Sheading}>
            <div>
              {" "}
              A 4 Digit code has been sent to your{" "}
              {user?.data?.mobile ? "Number" : "Email"}
            </div>
            <div className={styles.changeCred}>
              <div style={{ color: "white" }}>
                {user?.data?.mobile ? (
                  <span>
                    {" "}
                    <span style={{ color: "#c2478a" }}>+91-</span>
                    {user?.data?.mobile}
                  </span>
                ) : (
                  <span> {user?.data?.email}</span>
                )}
              </div>
              <Link to="/login">
                <div className={styles.change__link}>CHANGE</div>
              </Link>
            </div>
          </div>

          <div className={styles.digitGroup}>
            {otpvalue.map((digit, index) => (
              <input
                key={index}
                value={digit}
                maxLength={1}
                onChange={(e) => handleChange(e.target.value, index)}
                onKeyUp={(e) => handleBackspaceAndEnter(e, index)}
                ref={(reference) =>
                  (otpBoxReference.current[index] = reference)
                }
                className={styles.digitinput}
              />
            ))}
          </div>

          <div className={styles.otp__timer}>
            <div>Time Remaining: {formatTime(seconds)}</div>
            {!disable && (
              <div className={styles.resetButton} onClick={handleResendOtp}>
                Resend
              </div>
            )}
          </div>
          <div className={styles.formbutton__container}>
            {isSubmitting && (
              <button disabled={true} style={{ cursor: "not-allowed" }}>
                {" "}
                ...loading
              </button>
            )}
            {!isSubmitting && (
              <button
                type="submit"
                disabled={isSubmitting}
                onClick={handleSubmit}
              >
                Continue
              </button>
            )}
          </div>

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
      <Toaster />
    </div>
  );
};

export default Otp__Component;
