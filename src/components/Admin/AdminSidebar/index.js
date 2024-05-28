import React from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import styles from "./index.module.css";
import { ReactComponent as CalendarLogo } from "../../../assets/icons/calendar.svg";
import { ReactComponent as SurveysLogo } from "../../../assets/icons/surveys.svg";
import { ReactComponent as WorkshopsLogo } from "../../../assets/icons/workshop.svg";
import "./side.css";
import { ReactComponent as AppLogo } from "../../../assets/icons/Zariyaa-Logo.svg";

const AdminSidebarComp = () => {
  const menuItem = [
    {
      path: "/dashboard/admin",
      name: "Dashboard",
    },
    {
      path: "/dashboard/surveys",
      name: "Surveys",
    },
  ];

  return (
    <div className={styles.mainContainer}>
      <div className={styles.sidebar}>
        <div className={styles.appLogo}>
          <Link to="/dashboard/admin">
            <AppLogo />
          </Link>
        </div>

        {menuItem.map((item, index) => (
          <NavLink
            exact
            to={item.path}
            key={index}
            className={styles.link}
            activeclassname={"active"}
          >
            <div className={styles.linkText}>{item.name}</div>
            <div className={styles.linkText}>{">"}</div>
          </NavLink>
        ))}
      </div>
    </div>
  );
};
export default AdminSidebarComp;
