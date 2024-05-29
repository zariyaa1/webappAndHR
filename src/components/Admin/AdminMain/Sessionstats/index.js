import React, { useState, useEffect } from "react";
import styles from "./index.module.css";
import { Box, CircularProgress } from "@mui/material";
import { getDashboardData } from "../../../../services/admin";
import {
  PieChart,
  Pie,
  Sector,
  Cell,
  ResponsiveContainer,
  Legend,
} from "recharts";

const ratings = [
  {
    rating: 3,
  },
  {
    rating: 4,
  },
  {
    rating: 5,
  },
];
const SessionStats = ({
  sessionStats,
  setSessionStat,
  sessionRating,
  setSessionRating,
  dated,
  state }) => {
  // const [sessiondata, setSessiondata] = useState();
  // const [ratingdata, setRatingdata] = useState();
  const [average, setAverage] = useState(0);
  const date = dated;

  useEffect(() => {
    getDashboardData({ query: "session_distribution", fromDate: state[0].endDate, toDate: state[0].startDate })
      .then((res) => {
        setSessionStat(res.data);
      })
      .catch((err) => {
        console.log(err);
      });


    getDashboardData({ query: "rating_distribution", fromDate: state[0].endDate, toDate: state[0].startDate })
      .then((res) => {
        const activeIds = [3, 4, 5];
        const result = res.data.filter(({ _id }) => activeIds.includes(_id));
        setSessionRating(result);


        console.log(result)
        // NEED TO REVISIT THE LOGIC
        let TotalScore = 0;
        let totalRating = 0
        result.forEach(((item, index) => {
          TotalScore += (item.count * item.rating);
          totalRating += item.count;
        }));;
        console.log(TotalScore, totalRating)
        setAverage((TotalScore / totalRating).toFixed(2));
      })
      .catch((err) => {
        console.log(err);
      });
  }, [state]);

  const CustomLegendContent = ({ payload }) => {
    return (
      <div className={styles.legendContainer}>
        {ratings?.map((entry, index) => (
          <div className={styles.legendContentContainer}>
            <div
              style={{ backgroundColor: getBarColor(entry.rating) }}
              className={styles.legendbox}
            ></div>
            -
            <div
              className={styles.legendtext}
              key={`item-${index}`}
              style={{ color: getBarColor(entry.rating) }}
            >
              {entry.rating} {""} Star{" "}
            </div>
          </div>
        ))}
      </div>
    );
  };
  const getBarColor = (value) => {
    if (value === 3) {
      return "#79D2DE";
    } else if (value === 4) {
      return "#147AD6";
    } else if (value === 5) {
      return "#EC6666";
    }
  };
  return (
    <div className={styles.mainContainer}>
      {sessionStats && (
        <div className={styles.secondaryContainer}>
          <SessionDistribution
            sessiondata={sessionStats}
          />
          <div className={styles.secondContainer}></div>


          <SessionRating
            average={average}
            ratingdata={sessionRating}
            getBarColor={getBarColor}
            CustomLegendContent={CustomLegendContent}
          />
        </div>
      )}
    </div>
  );
};



const SessionDistribution = ({ sessiondata }) => {

  return (<>

    <div className={styles.firstContainer}>
      <span className={styles.mainHeading}>Session Stats</span>
      <div className={styles.sessionContainer}>
        <span className={styles.text1}>
          {sessiondata?.videoCall + sessiondata?.VoiceCall}
        </span>
        <span className={styles.text2}>Total Sessions</span>
        <div className={styles.firstP}>
          <progress
            max={sessiondata?.videoCall + sessiondata?.VoiceCall}
            value={sessiondata?.videoCall}
            className="firstprogress"
          />

          <div className={styles.subtext}>
            {sessiondata?.videoCall} <br />
            <span>Video</span>
          </div>
        </div>
        <div className={styles.secondP}>
          <progress
            max={sessiondata?.VoiceCall + sessiondata?.VoiceCall}
            value={sessiondata?.VoiceCall}
            className="secondprogress"
          />{" "}
          <div className={styles.subtext}>
            {sessiondata?.VoiceCall}
            <br />
            <span>Audio</span>
          </div>
        </div>
      </div>{" "}
      <div className={styles.sessionDivContainer}>
        <div className={styles.circularContainer}>
          <Box sx={{ position: "relative", display: "inline-flex" }}>
            <CircularProgress
              variant="determinate"
              size="61px"
              value={100}
              sx={{ color: "#D8D8D8", position: "absolute", left: 0 }}
            />{" "}
            <CircularProgress
              variant="determinate"
              value={sessiondata?.family}
              size="61px"
              sx={{ color: "#C2478A" }}
            />
            <Box
              sx={{
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                position: "absolute",
                display: "flex",

                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span className={styles.regcardCircBar}>
                {sessiondata?.family}
              </span>
            </Box>
          </Box>
          <div className={styles.progDescCont}>
            <span className={styles.desc1}>Family</span>

            <span className={styles.desc2}>Session</span>
          </div>
        </div>{" "}
        <div className={styles.circularContainer}>
          <Box sx={{ position: "relative", display: "inline-flex" }}>
            <CircularProgress
              variant="determinate"
              size="61px"
              value={100}
              sx={{ color: "#D8D8D8", position: "absolute", left: 0 }}
            />
            <CircularProgress
              variant="determinate"
              value={sessiondata?.self}
              size="61px"
              sx={{ color: "#EC6666" }}
            />
            <Box
              sx={{
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                position: "absolute",
                display: "flex",

                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span className={styles.regcardCircBar}>
                {sessiondata?.self}
              </span>
            </Box>
          </Box>
          <div className={styles.progDescCont}>
            <span className={styles.desc1}>Individual</span>

            <span className={styles.desc2}>Session</span>
          </div>
        </div>
      </div>
    </div>
  </>)
}
const SessionRating = ({ average, ratingdata, getBarColor, CustomLegendContent }) => {

  return (<>

    <div className={styles.thirdContainer}>
      <span>⭐ Session Rating</span>
      <div className={styles.pieChartContainer}>
        <div className={styles.ctm}>
          <span>{average}</span>
          <span>Average Rating</span>
        </div>
        <PieChart width={450} height={300}>
          <Pie
            data={ratingdata}
            dataKey="count"
            padding={{ top: 10, right: 10, bottom: 10, left: 10 }}
            cx="50%"
            cy="50%"
            innerRadius={60}
            label={({ rating, count }) => `${rating}-star : ${count}`}
            fill="#00a0fc"
            stroke="#000000"
            strokeWidth={1}
          >
            {ratingdata?.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={getBarColor(entry.rating)}
                strokeWidth={0}
              />
            ))}
          </Pie>
          <Legend content={<CustomLegendContent />} />
        </PieChart>
      </div>
    </div>
  </>)
}
export default SessionStats;
