import styles from "./index.module.css";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Category } from "../../utilities/Api";
import SharedComponent from "../SharedComponent";

const ChallengesComponent = () => {
  const [coursesData, setCoursesData] = useState([]);

  const categories = useSelector((state) => state.category.data);

  useEffect(() => {
    if (coursesId) {
      fetchCoursesData();
    }
  }, [categories]);

  const courses = categories?.find((item) => item.name === "Courses");
  const coursesId = courses?._id;

  const fetchCoursesData = async () => {
    const res = await Category.get(`/category?parentCategoryId=${coursesId}`);
    setCoursesData(res?.data?.data);
  };

  const handleClick = () => {
    console.log("btn clicked");
  };

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

export default ChallengesComponent;
