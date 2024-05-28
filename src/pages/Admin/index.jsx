import React from "react";
import AdminNavbarComp from "../../components/Admin/AdminNavbar";
import AdminMainComp from "../../components/Admin/AdminMain";
import AdminSideStatsComp from "../../components/Admin/AdminStatsSidebar";
import AdminSidebarComp from "../../components/Admin/AdminSidebar";
import styles from "./index.module.css";
const Admin = () => {
  return (
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
};

export default Admin;
