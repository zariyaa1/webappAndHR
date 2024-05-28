import styles from "./index.module.css";
import { useEffect, useState } from "react";
import { ButtonBase } from "@mui/material";
import YourPostLogo from "../../../assets/icons/yourPost.svg";
import AddPostLogo from "../../../assets/icons/addPost.svg";
import toast, { Toaster } from "react-hot-toast";
import ViewPostCard from "../../../utilities/ViewPostCard";
import testIMg from "../../../assets/images/dailiesTest.svg";
import TimeDifferenceCalculator from "../../../utilities/TimeDifference";
import moment from "moment";
import { useParams } from "react-router-dom";
import { fetchCommunity } from "../../../services/community";

const Formkeys = {
  name: "name",
  description: "description",
  mediaLink: "mediaLink",
  isApproved: "isApproved",
  isActive: "isActive",
  tenant_id: "tenant_id",
};

const ViewPostComponent = () => {
  const { Id } = useParams();
  const [data, setData] = useState();
  const [postData, setPostData] = useState({
    [Formkeys.name]: "",
    [Formkeys.description]: "",
    [Formkeys.mediaLink]: "",
    [Formkeys.tenant_id]: "",
    [Formkeys.isApproved]: true,
    [Formkeys.isActive]: true,
  });
  const currentTime = moment();

  useEffect(() => {
    fetchCommunity()
      .then((res) => {
        if (res?.status === 200) {
          res?.data?.data.map((item, index) => {
            if (Id === item._id) {
              setData(item);
            }
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className={styles.container}>
      <Toaster />
      <div className={styles.mainContainer}>
        <div className={styles.header}>
          <div className={styles.headerLeft}>View Post</div>
          <div className={styles.headerRight}>
            <ButtonBase
              sx={{
                width: 154,
                height: 39,
                backgroundColor: "transparent",
                borderRadius: "20px",
                color: "#FFFFFF",
                fontSize: "12px",
                fontWeight: "700",
                border: "1px solid #C2478A",
                justifyContent: "space-around",
                paddingLeft: "5%",
                paddingRight: "6%",
                marginRight: "5%",
              }}
            >
              <img src={YourPostLogo} />
              Your Post
            </ButtonBase>

            <ButtonBase
              sx={{
                width: 154,
                height: 39,
                backgroundColor: "#C2478A",
                borderRadius: "20px",
                color: "#FFFFFF",
                fontSize: "12px",
                fontWeight: "700",
                justifyContent: "space-around",
                paddingLeft: "5%",
                paddingRight: "8%",
                marginLeft: "5%",
              }}
            >
              <img src={AddPostLogo} />
              Add Post
            </ButtonBase>
          </div>
        </div>
        <div>
          <ViewPostCard
            imgURL={data?.mediaLink}
            userName={data?.created_by?.name}
            postName={data?.name}
            postDescription={data?.description}
            postTime={TimeDifferenceCalculator(moment)}
            id={Id}
          />
        </div>
      </div>
    </div>
  );
};

export default ViewPostComponent;
