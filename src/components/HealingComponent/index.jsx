import styles from "./index.module.css";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SharedComponent from "../SharedComponent";
import { useNavigate, useParams } from "react-router-dom";
import { selectCourseDetails } from "../../store/slices/courseDetailSlice";
import { fetchMainData } from "../../services/mainData";

const HealingComponent = () => {
  const categories = useSelector((state) => state.category.data);
  const [healingData, setHealingData] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (healingId) {
      fetchMainData(healingId)
        .then((res) => {
          if (res.status === 200) {
            setHealingData(res?.data?.data);
          }
        })
        .catch((err2) => {
          console.log(err2);
        });
    } else {
      console.log("api not hitting");
    }
  }, [categories]);

  const healing = categories?.find((item) => item.name === "Healing Tools");
  const healingId = healing?._id;

  const handleClick = (tempId) => {
    dispatch(selectCourseDetails(tempId));
    navigate(`/healingtools/${tempId}`);
  };
  return (
    <div className={styles.container}>
      <SharedComponent
        onClick={handleClick}
        headerData={healing}
        cardData={healingData}
      />
    </div>
  );
};

export default HealingComponent;
