import React, { useEffect, useState } from "react";
import styles from "./index.module.css";
import PsychologicalDisorder from "../../../assets/icons/psychology1.svg";

import { Box, CircularProgress } from "@mui/material";
import { getDashboardData } from "../../../services/admin/index";
const AdminSideStatsComp = ({
  issueDistribution,
  setIssueDistribution,
  dated, state }) => {
  const date = dated;
  const [data, setData] = useState([]);
  const [name, setName] = useState();
  const [image, setImage] = useState();
  const [majorIssue, setMajorIssue] = useState();

  useEffect(() => {
    getDashboardData({ query: "issue_distribution", fromDate: state[0].endDate, toDate: state[0].startDate })
      .then((res) => {
        setMajorIssue(res.data?.firstHighestAndSecondHighest);
        setIssueDistribution(res?.data?.issues);
        setName(res?.data?.issues?.[0].question);
        setImage(res?.data?.issues?.[0].image);
        setData(res?.data?.issues?.[0].subissues);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [state]);



  const selectdiv = (index) => {
    setName(issueDistribution?.[index].question);
    setImage(issueDistribution?.[index].image);
    setData(issueDistribution?.[index].subissues);
  };

  return (
    <div className={styles.MainContainer}>
      <div className={styles.secondaryContainer}>
        <div className={styles.issueContainer}>
          <span className={styles.mainHead}>Issues Stats</span>
          <span className={styles.mainDesc}>
            Major Issues Faced by your firm.
          </span>

          <MajorIssueComponent majorIssue={majorIssue} />
          <div className={styles.diffissue}>
            <span>Different issues that employees seeked support for:</span>
          </div>
          <MainIssueComponent issueData={issueDistribution} selectdiv={selectdiv} />
        </div>
        <SubISSUEComponent name={name} data={data} image={image} />
      </div>
    </div>
  );
};


const MainIssueComponent = ({ issueData, selectdiv }) => {
  return (<>

    <div className={styles.disordersContainer}>
      {issueData &&
        issueData?.map((item, index) => (
          <>

            {item.percentage != 0 && <div
              key={index}
              className={styles.disorder}
              onClick={() => selectdiv(index)}
            >
              <div>
                <img src={item.image} className={styles.disorderImage} />
              </div>
              <div className={styles.disorderName}>   <a className={styles.removeUnderline} href="#subIssue"> {item.question}</a> </div>
              <div className={styles.disorderProgress}>
                <Box sx={{ position: "relative", display: "inline-flex" }}>
                  <CircularProgress
                    variant="determinate"
                    size="51px"
                    value={100}
                    sx={{ color: "#D8D8D8", position: "absolute", left: 0 }}
                  />
                  <CircularProgress
                    variant="determinate"
                    value={item.percentage < 1 ? 0 : item.percentage}
                    size="51px"
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
                      {item.percentage < 1 ? 0 : item.percentage}
                    </span>
                  </Box>
                </Box>
              </div>
            </div>}
          </>
        ))}
    </div>
  </>)
}

const SubISSUEComponent = ({ name, data, image }) => {

  return (<>

    <div className={styles.issueContainer} id="subIssue">
      <span className={styles.mainHead}>Issues Stats</span>
      <div className={styles.disordersContainer}>
        <div className={styles.secCont}>
          <img src={image} className={styles.disorderImage} />
          <span>{name}</span>
        </div>

        {data &&
          data.map((item, index) => (

            <>

              {item.percentage != 0 && <div key={index} className={styles.disorderSec}>
                <div className={styles.disorderNameSec}>{item.subissue}</div>
                <div className={styles.disorderProgress}>
                  <Box sx={{ position: "relative", display: "inline-flex" }}>
                    <CircularProgress
                      variant="determinate"
                      size="51px"
                      value={100}
                      sx={{ color: "#D8D8D8", position: "absolute", left: 0 }}
                    />
                    <CircularProgress
                      variant="determinate"
                      value={item.percentage}
                      size="51px"
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
                        {item.percentage}
                      </span>
                    </Box>
                  </Box>
                </div>
              </div>}
            </>

          ))}
      </div>
    </div>
  </>)
}


const MajorIssueComponent = ({ majorIssue }) => {

  return (<>
    {majorIssue && (
      <div className={styles.issueCountContainer}>
        <div className={styles.issueMiniContainer}>
          <span className={styles.issueCount}>
            {majorIssue?.[0].percentage}%
          </span>
          <span className={styles.issueName}>
            {" "}
            {majorIssue?.[0].question}%
          </span>
        </div>
        <div className={styles.divider}>|</div>
        <div className={styles.issueMiniContainer}>
          <span className={styles.issueCount}>
            {majorIssue?.[1].percentage}%
          </span>
          <span className={styles.issueName}>
            {" "}
            {majorIssue?.[1].question}%
          </span>
        </div>
      </div>
    )}
  </>)
}
export default AdminSideStatsComp;
