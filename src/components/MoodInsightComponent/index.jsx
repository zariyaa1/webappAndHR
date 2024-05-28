import React, { useState } from "react";
import styles from "./index.module.css";
import moodMeter from "../../assets/icons/meter.svg";
import sleepMeter from "../../assets/icons/sleepMeter.svg";
import { useEffect } from "react";
import { moodScore } from "../../services/mood";
import "./cards.css";
import { sleepScore } from "../../services/sleep";
const MoodInsightComp = () => {
  const [mooddata, setMooddata] = useState();
  const [sleepdata, setSleepdata] = useState();

  useEffect(() => {
    moodScore()
      .then((res) => {
        setMooddata(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    sleepScore()
      .then((res) => {
        setSleepdata(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className={styles.mainContainer}>
      <h1 className={styles.headingStats}>Mood & Sleep Stats</h1>
      <div className={styles.scoreContainer}>
        <div className={styles.scoreCard}>
          <div className={styles.minidivs}>
            <img src={moodMeter} />
          </div>
          <div className={styles.minidivs}>
            <h1 className={styles.moodScoreHeading}>
              <span>{Math.floor(mooddata?.score)}</span> Mood Score{" "}
            </h1>
            <p className={styles.MoodcardContent}>
              Your mood score is {Math.floor(mooddata?.score)} which means you
              mood seems to be
              {""}{" "}
              <span style={{ textDecoration: "underline" }}>
                {mooddata?.message}
              </span>
            </p>
          </div>
        </div>{" "}
        <div className={styles.scoreCard}>
          <div className={styles.minidivs}>
            <img src={sleepMeter} />
          </div>
          <div className={styles.minidivs}>
            <h1 className={styles.sleepScoreHeading}>
              <span>{sleepdata?.score}</span> EmotionScore
            </h1>
            <p className={styles.SleepcardContent}>
              Your mood score is {Math.floor(sleepdata?.score)} which means you
              mood seems to be{" "}
              <span style={{ textDecoration: "underline" }}>
                {sleepdata?.message}
              </span>
            </p>
          </div>
        </div>{" "}
      </div>
      <h1 className={styles.headingHistory}>Mood History</h1>
      <div className={styles.moodCardContainer}>
        {mooddata?.stats?.map((data, index) => (
          <div className={data.name}>
            <div className="imageCont">
              <img src={data?.imageUrl} />
            </div>
            <div className="descCont">
              <h1>{data?.name}</h1>
              <p>
                {data?.count}
                {""}times
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MoodInsightComp;
