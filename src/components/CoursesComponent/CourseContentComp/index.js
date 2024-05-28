import React, { useEffect, useState } from "react";

import styles from "../CoursesDetailsComponent/index.module.css";
import DetailsCard from "../../../utilities/DetailsCard";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import TabMenu from "../../../utilities/TabMenu";
import axios from "../../../services/axios";
import { Grid, styled } from "@mui/material";

const Img = styled("img")({
  margin: "auto",
  display: "block",
  width: "100%",
  height: "426px",
  marginTop: "6%",

  borderRadius: "10px",
});

const CourseContentComponent = ({ onClick }) => {
  const { courseId } = useParams();
  const { index } = useParams();

  const [courseDetailsData, setCourseDetailsData] = useState([]);
  const [courseExplainationData, setCourseExplainationData] = useState();
  const [courseCategory, setCourseCategory] = useState([]);
  const [courseExplainationPlaylist, setCourseExplainationPlaylist] = useState(
    []
  );
  const [open, setOpen] = useState(false);

  const categories = useSelector((state) => state.category.data);

  const findCourse = categories?.find((item) => item.name === "Courses")?._id;
  const explainationId = courseExplainationData?._id;

  useEffect(() => {
    const fetchData = async () => {
      if (courseId && findCourse) {
        try {
          const [detailsRes, categoryRes] = await Promise.all([
            axios.get(`content-service/apis/playlist?categoryId=${courseId}`),
            axios.get(
              `content-service/apis/category?parentCategoryId=${findCourse}`
            ),
          ]);
          setCourseDetailsData(detailsRes?.data?.data || []);
          setCourseCategory(categoryRes?.data?.data || []);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    };

    fetchData();
  }, [courseId, findCourse]);

  useEffect(() => {
    const res = courseDetailsData.filter((item) => item?._id === index);
    setCourseExplainationData(res[0]);
  }, [courseDetailsData]);

  useEffect(() => {
    const fetchPlaylistContent = async () => {
      if (explainationId) {
        try {
          const [courseExplaination] = await Promise.all([
            axios.get(
              `content-service/apis/playlistcontent?playlistId=${explainationId}`
            ),
          ]);
          setCourseExplainationPlaylist(courseExplaination?.data?.data);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    };
    fetchPlaylistContent();
  }, [explainationId]);

  const explainerType = courseExplainationPlaylist.filter(
    (item) => item?.contentId?.type === "Explainer"
  );
  const solutionType = courseExplainationPlaylist.filter(
    (item) => item?.contentId?.type === "Solution"
  );

  return (
    <>
      <div className={styles.container}>
        {courseExplainationData ? (
          <div className={styles.mainExplainationContainer}>
            <div className={styles.leftContainer}>
              <div className={styles.header}>
                <div
                  style={{
                    color: "#FD939F",
                  }}
                  className={styles.heading}
                >
                  {courseExplainationData?.name}
                </div>
                <div className={styles.subHeading}>
                  {courseExplainationData?.description}
                </div>
              </div>
              <div className={styles.card}>
                {/* <div className={styles.cardHead}>What is Depression ?</div> */}
                <Grid item>
                  <Img alt="complex" src={courseExplainationData?.mediaLink} />
                </Grid>
                <div className={styles.overviewCard}>
                  <div
                    style={{
                      borderBottom: "4px solid #FD939F",
                      display: "inline-block",
                      paddingBottom: "10px",
                    }}
                  >
                    OVERVIEW
                  </div>
                  <div
                    style={{
                      marginTop: "2%",
                    }}
                  >
                    {courseExplainationData?.details.map((data) => (
                      <div>{data}</div>
                    ))}
                  </div>
                </div>
                <div className={styles.overviewCard}>
                  <div>Benefits</div>
                  <div>
                    {courseExplainationData?.benefits.map((data) => (
                      <div>{data}</div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.rightContainer}>
              <TabMenu
                explainerType={explainerType}
                solutionType={solutionType}
              />
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default CourseContentComponent;
