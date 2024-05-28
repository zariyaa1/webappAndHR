import React, { useState } from "react";
import styles from "./index.module.css";
import { Modal } from "@mui/material";
const WelcomePopup = () => {
  const [open, setOpen] = useState(true);
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div className={styles.modalContainer}>
      <Modal
        open={open}
        sx={{
          "& > .MuiBackdrop-root": {
            backgroundColor: "rgba(194, 71, 138, 0.7) ",
          },
          "&:focus": {
            outline: "none",
          },
          border: "none",
          outline: "none",
        }}
      >
        <div className={styles.modal}>
          <div className={styles.Mheading}>Welcome Aboard</div>
          <div className={styles.Sheading}>
            Congratulations! on taking your first step towards re-discovering
            yourself & your happiness, you are in the right place at the right
            time !!
          </div>
          <div className={styles.Sheading}>
            We welcome you to your personalised happiness journey that we have
            created specially for you.{" "}
          </div>
          <div className={styles.Mbutton}>
            <button onClick={handleClose}>Start Your Journey</button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default WelcomePopup;
