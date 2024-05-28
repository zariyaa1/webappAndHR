import React, { useState } from "react";
import styles from "./index.module.css";
import newRegf from "../../../assets/images/newReg.svg";
import newReg from "../../../assets/images/newRef.svg";
import divider from "../../../assets/icons/Divider.svg";
import { useEffect } from "react";
import { getDashboardData } from "../../../services/admin";
const RegistrationCards = ({ dated, state, userDistribution, SetuserDistribution }) => {


  const [mdata, setMdata] = useState(0);
  const [fdata, setFdata] = useState(0);
  const [odata, setOdata] = useState(0);

  useEffect(() => {
    getDashboardData({ query: "corporate_user_distribution", fromDate: state[0].endDate, toDate: state[0].startDate })
      .then((res) => {
        SetuserDistribution(res?.data);

        setMdata(0);
        setFdata(0);
        setOdata(0);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [state]);



  useEffect(() => {
    let M = 0;
    let F = 0;
    let O = 0;
    userDistribution?.maleAndFemaleDistribution.map((item, index) => {
      if (item.gender === "Male" || item.gender === "male") {
        M = M + item.count;
      } else if (item.gender === "female" || item.gender === "Female") {
        F = F + item.count;
      } else {
        O = O + item.count;
      }
    });
    setMdata(M);
    setFdata(F);
    setOdata(O);
  }, [userDistribution]);
  return (
    <div className={styles.RegCardContainer}>
      {userDistribution && (
        <>
          <div className={styles.registrationCard}>
            <span className={styles.mainHead}>Total Registration</span>
            <div className={styles.CardLeft}>
              <span className={styles.mainCount}>
                {userDistribution?.totalRegistration}
              </span>

              <img src={newRegf} />
            </div>
          </div>{" "}
          <div className={styles.registrationCard}>
            <span className={styles.mainHead}>New Registration</span>
            <div className={styles.CardLeft}>
              <span className={styles.mainCount}>
                {userDistribution?.newRegistrationBasedOnDate}
              </span>

              <img src={newReg} />
            </div>
          </div>
          <div className={styles.registrationCardD}>
            <div className={styles.CardLeftD}>
              <span className={styles.mainHeadD}>Male</span>
              <span className={styles.mainCountD}>{mdata}</span>
            </div>
            <div>
              <img src={divider} />
            </div>
            <div className={styles.CardLeftD}>
              <span className={styles.mainHeadD}>Female</span>
              <span className={styles.mainCountD}>{fdata}</span>
            </div>
            <div>
              <img src={divider} />
            </div>
            <div className={styles.CardLeftD}>
              <span className={styles.mainHeadD}>prefer not say</span>
              <span className={styles.mainCountD}>{odata} </span>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default RegistrationCards;
