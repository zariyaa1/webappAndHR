import React, { useEffect, useState } from "react";
import styles from "../Moodstats/index.module.css";
import {
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
  Cell,
} from "recharts";
import { getDashboardData } from "../../../../services/admin";

// need to remove dated
const Workingstats = ({
  dated,
  state,
  preferenceDistribution,
  setPreferenceDistribution
}) => {
  const date = dated;
  const getColor = (index) => {
    if (index === 0) {
      return "#EC6666";
    } else if (index === 1) {
      return "#79D2DE";
    } else if (index === 2) {
      return "#147AD6";
    } else if (index === 3) {
      return "#147AD6";
    }
  };
  const getheightvalue = (index) => {
    return preferenceDistribution?.[index].answers?.length * 50;
  };



  useEffect(() => {
    getDashboardData({ query: "preference_distribution", fromDate: state[0].endDate, toDate: state[0].startDate })
      .then((res) => {
        setPreferenceDistribution(res?.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [state]);

  return (
    <>
      {preferenceDistribution?.map((item, index) => (
        <div className={styles.mainContainer}>
          <div className={styles.SecondaryContainer}>
            <div className={styles.statsContainer}>
              <WorkingStatComponent
                key={index}
                item={item}
                getColor={getColor}
                index={index}
                getheightvalue={getheightvalue}
              />
            </div>
          </div>
        </div>
      ))}
    </>
  );
};


const WorkingStatComponent = ({ item, getColor, index, getheightvalue, }) => {

  return (<>

    <div className={styles.semiGraphContainer}>
      <div>
        <span>{item?.question}</span>
      </div>
      <div className={styles.graphContainer}>
        <div className={styles.question}>
          {item?.answers?.map((item, index2) => (
            <div
              key={index2}
              style={{ color: `${getColor(index)}` }}
              className={styles.graphlabel}
            >
              <span>{item?.answer}</span>
            </div>
          ))}
        </div>
        <div>
          <BarChart
            layout="vertical"
            data={item?.answers}
            width={400}
            height={getheightvalue(index)}
            barSize={50}
          >
            <CartesianGrid stroke="#f5f5f5" />
            <XAxis type="number" dataKey="percentage" hide />
            <YAxis dataKey="mood" type="category" hide />
            <Tooltip />
            <Bar
              dataKey="percentage"
              fill="#00a0fc"
              stroke="#000000"
              strokeWidth={1}
            >
              {item?.answers?.map((entry, index1) => (
                <Cell
                  key={`cell-${index1}`}
                  fill={getColor(index)}
                  strokeWidth={0}
                />
              ))}
            </Bar>
          </BarChart>
        </div>
        <div>
          {item?.answers?.map((item) => (
            <div
              className={styles.graphCount}
              style={{ color: `${getColor(index)}` }}
            >
              <span>{Math.floor(item?.percentage)}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  </>)
}
export default Workingstats;
