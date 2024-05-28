import React from "react";
import appLogo from "../../assets/icons/appLogo.svg";
import styles from "./index.module.css";

const LandingPage = () => {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.leftContainer}>
        <img className={styles.logoImg} src={appLogo} alt="image-text" />
      </div>
      <div className={styles.rightContainer}>
        <div>
          <div>Welcome</div>
          <div>
            Re-discover your happiness through unique healing tools backed bt
            science & ancient wisdom.
          </div>
          <div>Select to continue your journey</div>
          <div>
            <button>Corporate User</button>
          </div>
          <div>
            <button>Individual User</button>
          </div>
          <div>
            By continuing you accept our
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://zariyaa.in/terms-and-conditions-2/"
            >
              <span style={{ cursor: "pointer" }}>
                Privacy policy & Terms of Use
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;


