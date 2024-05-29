import React, { useState } from "react";
import styles from "../Moodstats/index.module.css";
import sleepIcon from "../../../../assets/icons/sleepIcon.svg";
import { Box, CircularProgress } from "@mui/material";
import "../Moodstats/progress.css";

import { useEffect } from "react";
import { getDashboardData } from "../../../../services/admin";
import {
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
  ResponsiveContainer,
  Rectangle,
  Cell,
} from "recharts";

const SleepCards = ({
  sleepDistribution,
  setSleepDistribution,

  dated, state }) => {

  const [heightvalue, setHeightvalue] = useState(0);
  const date = dated;


  useEffect(() => {
    getDashboardData({ query: "sleep_score", fromDate: state[0].endDate, toDate: state[0].startDate })
      .then((res) => {
        setSleepDistribution(res.data);

        setHeightvalue(res.data.distribution?.length * 50);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [state]);



  return (
    <div className={styles.mainContainer}>
      {sleepDistribution && (
        <div className={styles.SecondContainer}>
          <span className={styles.firstHeading}>Sleep Stats</span>
          <div className={styles.statsContainer}>
            <div className={styles.semiContainer}>
              <Box sx={{ position: "relative", display: "flex" }}>
                {/* <SemiCircleProgress
          percentage={70}
          stroke={"#C2478A"}
          strokeWidth={10}
        /> */}
                <CircularProgress
                  variant="determinate"
                  size="200px"
                  value={100}
                  sx={{ color: "#D8D8D8", position: "absolute", left: 0 }}
                />
                <CircularProgress
                  variant="determinate"
                  value={Math.floor(sleepDistribution?.score * 10)}
                  size="200px"
                  sx={{ color: "#C2478A" }}
                />
                <Box
                  sx={{
                    top: "20px",
                    left: 0,
                    bottom: 0,
                    right: 0,
                    position: "absolute",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "flexStart",
                  }}
                >
                  <span className={styles.regcardCircBar}>
                    <img src={sleepIcon} />
                    <br />
                    {Math.floor(sleepDistribution?.score * 10)}%
                  </span>
                  <span className={styles.moodValue}>Average Mood</span>
                  <span className={styles.moodType}>{sleepDistribution?.message}</span>
                </Box>
              </Box>
            </div>
            <div
              style={{
                height: heightvalue,
                borderLeft: "3px solid rgba(165, 180, 203, 0.3)",
                paddingRight: "20px",
                marginTop: "20px",
              }}
            ></div>
            <div className={styles.semiContainer}>
              <div className={styles.graphContainer}>
                <div>
                  {sleepDistribution.distribution?.map((item, index) => (
                    <div
                      key={index}
                      style={{ color: getBarColor(item.emotion) }}
                      className={styles.graphlabel}
                    >
                      <span>{item.emotion}</span>
                      <img src={item.imageUrl} />
                    </div>
                  ))}
                </div>
                <div>
                  <BarChart
                    layout="vertical"
                    data={sleepDistribution.distribution}
                    width={350}
                    height={heightvalue}
                    barSize={50}
                  >
                    <CartesianGrid stroke="#f5f5f5" />
                    <XAxis type="number" dataKey="count" hide />
                    <YAxis dataKey="emotion" type="category" hide />
                    <Tooltip />
                    <Bar
                      dataKey="count"
                      fill="#00a0fc"
                      stroke="#000000"
                      strokeWidth={1}
                    >
                      {sleepDistribution.distribution?.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={getBarColor(entry.sleepEmotion)}
                          strokeWidth={0}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </div>
                <div>
                  {sleepDistribution.distribution?.map((item) => (
                    <div
                      className={styles.graphCount}
                      style={{ color: getBarColor(item.sleepEmotion) }}
                    >
                      <span>{item.percent.toFixed(2)}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};



const getBarColor = (value) => {
  if (value === "Okay") {
    return "#79D2DE";
  } else if (value === "Great" || value === "Good") {
    return "#147AD6";
  } else if (value === "Horrible" || value === "Not Good") {
    return "#EC6666";
  }
};

export default SleepCards;
