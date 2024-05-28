import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./index.module.css";

function PageNotFound() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/");
  };
  return (
    <>
      <div className={styles.mainContainer}>
        <p className={styles.errorPara}>error</p>
        <p className={styles.errorCode}>404</p>
        <p className={styles.wrongPage}>
          We can't find the page you're looking for...
        </p>
        <p className={styles.unavailableText}>
          The page you're looking for may be currently unavailable.
        </p>
        <button className={styles.btnStyle} onClick={handleClick}>
          Go back to home
        </button>
      </div>
    </>
  );
}

export default PageNotFound;
