import React, { useState } from "react";
import styles from "./index.module.css";
import sleepIcon from "../../../../assets/icons/sleepIcon.svg";
import { Box, CircularProgress } from "@mui/material";
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

const MoodCards = ({ dated, state, moodDistribution, SetmoodDistribution }) => {
  const [heightvalue, setHeightvalue] = useState(0);

  useEffect(() => {
    getDashboardData({ query: "mood_score", fromDate: state[0].endDate, toDate: state[0].startDate })
      .then((res) => {
        SetmoodDistribution(res.data);
        setHeightvalue(res?.data?.distribution?.length * 50);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [state]);



  return (
    <div className={styles.mainContainer}>
      {moodDistribution && (
        <div className={styles.SecondContainer}>
          <span className={styles.firstHeading}>Mood Stats</span>
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
                  value={moodDistribution?.score * 10}
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
                    {Math.floor(moodDistribution?.score * 10)}%
                  </span>
                  <span className={styles.moodValue}>Average Mood</span>
                  <span className={styles.moodType}>{moodDistribution?.message}</span>
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
                  {moodDistribution.distribution?.map((item, index) => (
                    <div
                      key={index}
                      style={{ color: getBarColor(item.mood) }}
                      className={styles.graphlabel}
                    >
                      <span>{item.mood}</span>
                      <img src={item.imageUrl} />
                    </div>
                  ))}
                </div>
                <div>
                  <BarChart
                    layout="vertical"
                    data={moodDistribution.distribution}
                    width={350}
                    height={heightvalue}
                    barSize={50}
                  >
                    <CartesianGrid stroke="#f5f5f5" />
                    <XAxis type="number" dataKey="count" hide />
                    <YAxis dataKey="mood" type="category" hide />
                    <Tooltip />
                    <Bar
                      dataKey="count"
                      fill="#00a0fc"
                      stroke="#000000"
                      strokeWidth={1}
                    >
                      {moodDistribution.distribution?.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={getBarColor(entry.mood)}
                          strokeWidth={0}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </div>
                <div>
                  {moodDistribution.moodDistribution?.map((item) => (
                    <div
                      className={styles.graphCount}
                      style={{ color: getBarColor(item.mood) }}
                    >
                      <span>{item.count}%</span>
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
  if (
    value === "excited" ||
    value === "relaxed" ||
    value === "unsure" ||
    value === "low"
  ) {
    return "#79D2DE";
  } else if (
    value === "grateful" ||
    value === "content" ||
    value === "peaceful" ||
    value === "joyful"
  ) {
    return "#147AD6";
  } else if (
    value === "hurt" ||
    value === "anxious" ||
    value === "angry" ||
    value === "hopeless"
  ) {
    return "#EC6666";
  }
};

export default MoodCards;
