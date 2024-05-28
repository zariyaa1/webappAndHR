import React from "react";
import styles from "./index.module.css";
import RegistrationCards from "./RegistrationCards";
import MoodCards from "./Moodstats";
import SessionStats from "./Sessionstats";
import ReviewComp from "./Reviews";
import SleepCards from "./Sleepstats";
import Workingstats from "./Workingstats";
const AdminMainComp = ({ dated,
  state,
  userDistribution,
  SetuserDistribution,
  moodDistribution,
  SetmoodDistribution,
  sleepDistribution,
  setSleepDistribution,
  setPreferenceDistribution,
  preferenceDistribution,
  sessionRating,
  setSessionRating,
  sessionStats,
  setSessionStat,
  Reviews,
  setReviews
}) => {
  const date = dated;

  return (
    <div className={styles.mainContainer}>
      <div className={styles.SecondaryCont}>
        <RegistrationCards
          userDistribution={userDistribution}
          SetuserDistribution={SetuserDistribution}
          state={state}
        />
        <MoodCards
          moodDistribution={moodDistribution}
          SetmoodDistribution={SetmoodDistribution}
          dated={date} state={state} />

        <SleepCards
          sleepDistribution={sleepDistribution}
          setSleepDistribution={setSleepDistribution}
          dated={date} state={state} />


        <Workingstats
          preferenceDistribution={preferenceDistribution}
          setPreferenceDistribution={setPreferenceDistribution}
          dated={date} state={state} />
        <SessionStats
          sessionStats={sessionStats}
          setSessionStat={setSessionStat}
          sessionRating={sessionRating}
          setSessionRating={setSessionRating}
          dated={date} state={state} />
        <ReviewComp
          Reviews={Reviews}
          setReviews={setReviews}

          dated={date} state={state} />
      </div>
    </div>
  );
};



export default AdminMainComp;
