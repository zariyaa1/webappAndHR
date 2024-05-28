import styles from "./index.module.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SharedComponent from "../SharedComponent";
import { useNavigate } from "react-router-dom";
import { selectCourseDetails } from "../../store/slices/courseDetailSlice";
import { fetchMainData } from "../../services/mainData";

const CoursesComponent = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [coursesData, setCoursesData] = useState([]);
  const categories = useSelector((state) => state.category.data);

  const courses = categories?.find((item) => item.name === "Courses");
  const coursesId = courses?._id;

  const handleClick = (courseDetailsId) => {
    dispatch(selectCourseDetails(courseDetailsId));
    navigate(`/courses/${courseDetailsId}`);
  };

  useEffect(() => {
    if (coursesId) {
      fetchMainData(coursesId)
        .then((res) => {
          if (res.status === 200) {
            setCoursesData(res?.data?.data);
          }
        })
        .catch((err2) => {
          console.log(err2);
        });
    } else {
      console.log("api not hitting");
    }
  }, [categories]);

  return (
    <div className={styles.container}>
      <SharedComponent
        onClick={handleClick}
        headerData={courses}
        cardData={coursesData}
      />
    </div>
  );
};

export default CoursesComponent;
