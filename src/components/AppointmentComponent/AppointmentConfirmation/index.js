import React, { useEffect, useState } from "react";
import styles from "../AppointmentDetails/index.module.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import as from "../../../assets/images/add-event.svg";
import { TextField } from "@mui/material";
import { verifyPayment } from "../../../services/payment";
import toast from "react-hot-toast";
const AppointmentConfirmationComponent = () => {
  const [data, setData] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    let val = localStorage.getItem("appointmentDetails");
    let value = JSON.parse(val);

    setData(value);
    const queryParameters = new URLSearchParams(window.location.search);
    const type = queryParameters.get("razorpay_payment_link_id");
    setTimeout(() => {
      if (type) {
        verifyPayment(type)
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            if (err?.response?.status === 404) {
              toast.error("Payment not found", { duration: 2000 });
              // navigate("/appointment");
            } else if (err?.response?.status === 500) {
              toast.error("Internal Server Error", { duration: 2000 });
            }
          });
      }
    }, 5000);
  }, []);

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
            <div className={styles.filled}></div>
          </div>
          <div className={styles.progressCard}>
            Confirmation
            <div className={styles.filled}></div>
          </div>
        </div>
        <div className={styles.viewContainer}>
          <div className={styles.leftContainer}>
            <div className={styles.leftHeading}>
              Appointment <span>Confirmation</span>
            </div>
            <div className={styles.leftImage}>
              <img src={as} />
            </div>
          </div>
          <div className={styles.rightContainer}>
            <div className={styles.rightHeading}>
              Sit Back & Relax, we have got you confirmed for your appoinment.
            </div>

            <div className={styles.details1}>
              {" "}
              {data?.time} | {data?.type}{" "}
            </div>
            <div className={styles.details2}>
              {data?.whom} | {data?.modeOfConsultation}
            </div>
            <div className={styles.details3}>{data?.date} </div>
            <div className={styles.bothering}>
              Meanwhile tell us what’s bothering You ? <br />
              <span>Don't worry it's our secret !</span>
            </div>
            <div className={styles.botheringInput}>
              {" "}
              <TextField
                sx={{
                  "& label.Mui-focused": {
                    color: "#C2478A",
                  },
                  "& .MuiInput-underline:before": {
                    borderBottomColor: "#C2478A!important",
                  },
                  "& .MuiInput-underline:hover:before": {
                    borderBottomColor: "#C2478A!important",
                  },
                  "& .MuiInput-underline:hover:": {
                    borderBottomColor: "#C2478A!important",
                  },
                  "& .MuiInput-underline:hover:after": {
                    borderBottomColor: "#C2478A!important",
                  },
                }}
                fullWidth
                margin="normal"
                id="standard-basic"
                label="Tell us more..."
                variant="standard"
                name="identifier"
                // onChange={handleChange}
                // onBlur={handleBlur}
                // value={values.identifier}
                inputProps={{ sx: { color: "#C2478A" } }}
                InputLabelProps={{ sx: { color: "#C2478A" } }}
              />
            </div>
            <div>
              <Link to="/myAppointment">
                <button className={styles.viewButton}>MY APPOINTMENTS</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentConfirmationComponent;
