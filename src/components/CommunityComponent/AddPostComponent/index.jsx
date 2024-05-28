import styles from "./index.module.css";
import { useEffect, useState } from "react";
import { ButtonBase } from "@mui/material";
import YourPostLogo from "../../../assets/icons/yourPost.svg";
import AddPostLogo from "../../../assets/icons/addPost.svg";
import ImageUploaderComponent from "../../../utilities/ImageUploader";
import { postCommunityData } from "../../../services/community";
import toast, { Toaster } from "react-hot-toast";
import LocalStorageService from "../../../utilities/LocalStorageService";
import { useNavigate } from "react-router-dom";
const Formkeys = {
  name: "name",
  description: "description",
  mediaLink: "mediaLink",
  isApproved: "isApproved",
  isActive: "isActive",
  tenant_id: "tenant_id",
};

const AddPostComponent = () => {
  const navigate = useNavigate();
  const [postData, setPostData] = useState({
    [Formkeys.name]: "",
    [Formkeys.description]: "",
    [Formkeys.mediaLink]: "",
    [Formkeys.tenant_id]: "",
    [Formkeys.isApproved]: true,
    [Formkeys.isActive]: true,
  });
  const token = LocalStorageService.getAccessToken();
  useEffect(() => {
    const user = parseJwt(token);
    // console.log(user);
  }, []);
  function parseJwt(token) {
    if (!token) {
      return;
    }
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace("-", "+").replace("_", "/");
    return JSON.parse(window.atob(base64));
  }

  const setData = (key, val) => {
    let tempData = { ...postData };
    tempData[key] = val;
    setPostData(tempData);
  };
  function handleAddedImage(imageFile) {
    setData(Formkeys.mediaLink, imageFile?.dataUrl);
  }
  function handleImageRemoved(file) {
    setData(Formkeys.mediaLink, "");
  }
  const handlePostData = () => {
    postCommunityData(postData)
      .then((res) => {
        console.log({ res });
        toast.success("Post created Successfully", { duration: 2000 });
        navigate("/community");
      })
      .catch((err) => {
        console.log(err);
        // toast.error(err?.response?.data?.message, { duration: 2000 });
      });
  };
  const handleViewPostUser = (post) => {
    navigate(`/community/viewPost/user`);
  };
  return (
    <div className={styles.container}>
      <Toaster />
      <div className={styles.mainContainer}>
        <div className={styles.header}>
          <div className={styles.headerLeft}>Add Post</div>
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
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            marginTop: "5%",
          }}
        >
          <div className={styles.leftBox}>
            <div className={styles.boxLabel}>Enter Post Details</div>
            <div>
              <div>
                <input
                  className={styles.inputFirst}
                  value={postData[Formkeys.name] || ""}
                  onChange={(e) => {
                    setData(Formkeys.name, e.target.value);
                  }}
                  type="text"
                  placeholder="Heading*"
                />
              </div>
              <div>
                <input
                  className={styles.inputSecond}
                  value={postData[Formkeys.description] || ""}
                  onChange={(e) => {
                    setData(Formkeys.description, e.target.value);
                  }}
                  type="text"
                  placeholder="What’s on your mind?"
                />
              </div>
            </div>
          </div>
          <div className={styles.RightBox}>
            <div className={styles.boxLabel}>Add image</div>
            <ImageUploaderComponent
              onImageAdded={handleAddedImage}
              onImageRemoval={handleImageRemoved}
            />
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "90%",
            margin: "auto",
            marginTop: "5%",
          }}
        >
          <div
            style={{
              backgroundColor: "#C2478A",
              width: "40%",
              textAlign: "center",
              height: "6vh",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "30px",
              color: "#FFFFFF",
              fontSize: "16px",
              fontWeight: "600",
              lineHeight: "19.36px",
            }}
            onClick={handlePostData}
          >
            Post
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPostComponent;
