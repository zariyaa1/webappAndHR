import React, { useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import styles from "./index.module.css";
import { useDispatch } from "react-redux";
import { fetchCategory } from "../../store/slices/categorySlice";

const DashboardContainer = ({ children }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCategory());
  }, []);

  return (
    <div className={styles.mainContainer}>
      <Sidebar />
      {children}
    </div>
  );
};

export default DashboardContainer;
