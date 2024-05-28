import React from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import styles from "./index.module.css";
import { ReactComponent as CalendarLogo } from "../../assets/icons/calendar.svg";
import { ReactComponent as DailiesLogo } from "../../assets/icons/message.svg";
import { ReactComponent as CoursesLogo } from "../../assets/icons/notepad.svg";
import { ReactComponent as ChallengesLogo } from "../../assets/icons/lockOpen.svg";
import { ReactComponent as ManLogo } from "../../assets/icons/personOutline.svg";
import { ReactComponent as AppLogo } from "../../assets/icons/appLogo.svg";
import myimage from "../../assets/images/advice.svg";

const Sidebar = () => {
  const menuItem = [
    {
      path: "/",
      name: "Home",
      icon: <CalendarLogo />,
    },
    {
      path: "/dailies",
      name: "Dailies",
      icon: <DailiesLogo />,
    },
    {
      path: "/healingtools",
      name: "Healing Tools",
      icon: <CalendarLogo />,
    },
    {
      path: "/courses",
      name: "Courses",
      icon: <CoursesLogo />,
    },

    // {
    //   path: "/challenges",
    //   name: "Challenges",
    //   icon: <ChallengesLogo />,
    // },
    {
      path: "/community",
      name: "Community",
      icon: <ManLogo />,
    },
    {
      path: "/appointment",
      name: "Appointment",
      icon: <ManLogo />,
    },
  ];
  const navigate = useNavigate();

  const handleBtnClick = () => {
    navigate(`/appointment`);
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.sidebar}>
        <div className={styles.appLogo}>
          <Link to="/">
            <AppLogo />
          </Link>
        </div>
        {menuItem.map((item, index) => (
          <NavLink
            to={item.path}
            key={index}
            className={styles.link}
            activeclassname={"active"}
          >
            <div className={styles.icon}>{item.icon}</div>
            <div className={styles.linkText}>{item.name}</div>
          </NavLink>
        ))}

        <div className={styles.cardStyle}>
          <div className={styles.cardContainer}>
            <div className={styles.adviceText}>Need Any Advice ?</div>
            <div className={styles.expertText}>Consult an Expert</div>
            <button onClick={handleBtnClick} className={styles.btnStyle}>
              Book an Appointment
            </button>
            <div className={styles.imageStyle}>
              <img src={myimage} alt="advice-image" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
