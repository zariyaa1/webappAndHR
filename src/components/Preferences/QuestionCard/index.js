import React, { useState } from "react";
import styles from "./index.module.css";

import correct from "../../../assets/icons/done 1.svg";
const QuestionCard = ({ heading, subheading, id, image, limit }) => {
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(!open);
  };

  return (
    <div
      key={id}
      className={!open ? styles.cardContainer : styles.cardContainer__active}
      onClick={handleClose}
    >
      <div className={styles.imgContainer}>
        <img src={image} className={styles.imG} />
      </div>
      <div className={styles.textContainer}>
        <div>
          <h1>{heading}</h1>
          <p>{subheading}</p>
        </div>
        {open && (
          <div>
            <img src={correct} />
          </div>
        )}
      </div>
    </div>
  );
};

export default QuestionCard;
