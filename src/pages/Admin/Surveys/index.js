import React from "react";
import styles from "../index.module.css";
import AdminSidebarComp from "../../../components/Admin/AdminSidebar";
import AdminNavbarComp from "../../../components/Admin/AdminNavbar";
import AdminSurveyComp from "../../../components/Admin/Surveys";
const Survey = () => {
  return (
    <div>
      <div className={styles.mainContainer}>
        <div className={styles.sidebarCont}>
          <AdminSidebarComp />
        </div>
        <div className={styles.secondContainer}>
          <div className={styles.navbarCont}>
            <AdminNavbarComp />
          </div>
        </div>
      </div>
      );
    </div>
  );
};

export default Survey;
