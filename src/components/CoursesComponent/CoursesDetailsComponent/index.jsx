import React, { useEffect, useState } from "react";
import styles from "./index.module.css";
import DetailsCard from "../../../utilities/DetailsCard";
import { useNavigate, useParams } from "react-router-dom";
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

const CoursesDetailsComponent = ({ onClick }) => {
  const navigate = useNavigate();
  const { courseId } = useParams();
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

  const headerData = courseCategory?.find((item) => item._id === courseId);
  const handleClick = (card) => {
    const id = card._id;
    // setCourseExplainationData(card);
    // setOpen(true);
    navigate(`/courses/content/${courseId}/${id}`);
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.mainContainer}>
          <div className={styles.header}>
            <div className={styles.heading}>{headerData?.name}</div>
            <div className={styles.subHeading}>
              {headerData?.description && (
                <>
                  {headerData?.description.split(" ").slice(0, -2).join(" ")}{" "}
                  <span className={styles.spanText}>
                    {headerData?.description.split(" ").slice(-2).join(" ")}
                  </span>
                </>
              )}
            </div>
          </div>
          <div className={styles.cardContainer}>
            {courseDetailsData
              ?.sort((a, b) => a.name.localeCompare(b.name))
              ?.map((card, index) => (
                <DetailsCard
                  onClick={() => handleClick(card, index)}
                  key={card._id}
                  imgURL={card.mediaLink}
                  mainText={card.name}
                  subText={card.description}
                />
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default CoursesDetailsComponent;
