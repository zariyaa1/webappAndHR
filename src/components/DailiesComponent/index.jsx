import styles from "./index.module.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SharedComponent from "../SharedComponent";
import { useNavigate, useParams } from "react-router-dom";
import { selectCourseDetails } from "../../store/slices/courseDetailSlice";
import { fetchMainData } from "../../services/mainData";

const DailiesComponent = () => {
  const categories = useSelector((state) => state.category.data);
  const [dailiesData, setDailiesData] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (dailiesId) {
      fetchMainData(dailiesId)
        .then((res) => {
          if (res.status === 200) {
            setDailiesData(res?.data?.data);
          }
        })
        .catch((err2) => {
          console.log(err2);
        });
    } else {
      console.log("api not hitting");
    }
  }, [categories]);

  const dailies = categories?.find((item) => item.name === "Dailies");
  const dailiesId = dailies?._id;

  const handleClick = (tempId) => {
    dispatch(selectCourseDetails(tempId));
    navigate(`/dailies/${tempId}`);
  };
  return (
    <div className={styles.container}>
      <SharedComponent
        onClick={handleClick}
        headerData={dailies}
        cardData={dailiesData}
      />
    </div>
  );
};

export default DailiesComponent;
