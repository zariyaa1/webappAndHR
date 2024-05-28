import styles from "./index.module.css";
import { useEffect, useState } from "react";
import { ButtonBase } from "@mui/material";
import { fetchCommunity } from "../../services/community";
import CommunityCard from "../../utilities/CommunityCard";
import YourPostLogo from "../../assets/icons/yourPost.svg";
import AddPostLogo from "../../assets/icons/addPost.svg";
import { useNavigate } from "react-router-dom";

const CommunityComponent = () => {
  const [communityData, setCommunityData] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    fetchCommunity()
      .then((res) => {
        if (res?.status === 200) {
          const mapReverse1 = res?.data?.data
            .slice(0)
            .reverse()
            .map((element) => {
              return element;
            });
          console.log(mapReverse1);
          setCommunityData(mapReverse1);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const handleAddClick = () => {
    navigate(`/community/addPost`);
  };
  const handleViewPost = (post) => {
    navigate(`/community/viewPost/${post?._id}`);
  };
  const handleViewPostUser = (post) => {
    navigate(`/community/viewPost/user`);
  };
  return (
    <div className={styles.container}>
      <div className={styles.mainContainer}>
        <div className={styles.header}>
          <div className={styles.headerLeft}>Community</div>
          <div className={styles.headerRight}>
            <ButtonBase
              onClick={handleViewPostUser}
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
                marginRight:"5%"

              }}
            >
              <img src={YourPostLogo} />
              Your Post
            </ButtonBase>

            <ButtonBase
              onClick={handleAddClick}
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
                marginLeft:"5%"
              }}
            >
              <img src={AddPostLogo} />
              Add Post
            </ButtonBase>
          </div>
        </div>
        <div
          style={{
            // width:"100%",
            // height:"100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "2%",
          }}
        >
          <div>
            {communityData &&
              communityData?.map((post) => (
                <CommunityCard
                  onClick={() => {
                    handleViewPost(post);
                  }}
                  postTime={post?.created_at}
                  userName={post?.created_by?.name}
                  key={post?._id}
                  imgURL={post?.mediaLink}
                  postName={post?.name}
                  postDescription={post?.description}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityComponent;
