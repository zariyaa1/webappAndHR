import * as React from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import BottomIcons from "./BottomIcons";
import TimeDifferenceCalculator from "./TimeDifference";
import testImg from "../assets/images/dailiesTest.svg";
import { useEffect } from "react";
import { getActivity, postActivity } from "../services/Activity";
import {
  ChatBubbleOutline,
  Comment,
  Favorite,
  FavoriteBorder,
  Send,
  Share,
} from "@mui/icons-material";
import LocalStorageService from "./LocalStorageService";
import { Toaster, toast } from "react-hot-toast";

const Img = styled("img")({
  margin: "auto",
  display: "block",
  width: 482,
  height: 386,
  borderRadius: "10px",
});
const TempDiv = styled("div")({
  margin: "auto",
  display: "block",
  width: 482,
  height: 386,
});

const ViewPostCard = ({
  imgURL,
  userName,
  postTime,
  postName,
  postDescription,
  onClick,
  width,
  id,
}) => {
  const uid = LocalStorageService.getID();
  const [comment, setComment] = React.useState();
  const [activity, setActivity] = React.useState();
  const [data, setData] = React.useState();
  const [liked, setLiked] = React.useState(false);

  const handleComment = () => {
    const data = {
      userId: uid,
      reaction: 0,
      mediaLink: "",
      comment: comment,
    };
    postActivity(id, data)
      .then((res) => {
        if (res.status === 201) {
          toast.success("Comment Succesfully added", { duration: 2000 });
          getActivity(id)
            .then((res) => {
              if (res.status === 404) {
                setActivity(false);
                setLiked(false);
              } else if (res.status === 200) {
                setActivity(res?.data?.data);

                res?.data?.data.map((item, index) => {
                  if (item.userId === uid) {
                    setLiked(true);
                  }
                });
              }
            })
            .catch((err) => {
              console.log(err);
            });
        }
      })
      .catch((err) => {});
  };

  useEffect(() => {
    getActivity(id)
      .then((res) => {
        if (res.status === 404) {
          setActivity(false);
          setLiked(false);
        } else if (res.status === 200) {
          console.log(res);
          setActivity(res?.data?.data);

          res?.data?.data.map((item, index) => {
            if (item.userId === uid) {
              setLiked(true);
            }
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const defaultPaperStyles = {
    p: 1,
    flexGrow: 1,
    backgroundColor: "#FFFFFF",
    boxShadow: "none",
    marginTop: 6,
    paddingBottom: 15,
    borderRadius: "15px",
  };

  const paperStyles = {
    ...defaultPaperStyles,
    ...(width && { maxWidth: width }),
  };

  const handleLike = () => {
    if (liked) return;
    const data = {
      userId: uid,
      reaction: 1,
      mediaLink: "",
      comment: "",
    };
    postActivity(id, data)
      .then((res) => {
        if (res.status === 201) {
          setLiked(true);
          getActivity(id)
            .then((res) => {
              if (res.status === 404) {
                setActivity(false);
                setLiked(false);
              } else if (res.status === 200) {
                setActivity(res?.data?.data);

                res?.data?.data.map((item, index) => {
                  if (item.userId === uid) {
                    setLiked(true);
                  }
                });
              }
            })
            .catch((err) => {
              console.log(err);
            });
        }
      })
      .catch((err) => {});
  };

  return (
    <Paper sx={paperStyles}>
      <Toaster />
      <Grid
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Grid container padding={2} paddingBottom={1.5} spacing={1}>
          <Grid
            container
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Grid
              item
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <AccountCircleIcon
                sx={{
                  width: "45px",
                  height: "45px",
                }}
              />
              <Grid item paddingLeft={1.2} alignItems={"flex-start"}>
                <Typography
                  sx={{
                    fontSize: "16px",
                    fontWeight: 600,
                    marginBottom: 0,
                    color: " #C2478A",
                    lineHeight: "19.36px",
                  }}
                  gutterBottom
                  variant="subtitle1"
                  component="div"
                >
                  {userName}
                </Typography>
                <Typography
                  sx={{
                    fontSize: "14px",
                    fontWeight: 500,
                    marginBottom: 0,
                    color: "#3E2968",
                    lineHeight: "16.94px",
                  }}
                  gutterBottom
                  variant="subtitle1"
                  component="div"
                >
                  {TimeDifferenceCalculator(postTime)}
                  {/* {postTime} */}
                </Typography>
              </Grid>
            </Grid>

            <MoreHorizIcon
              sx={{
                color: "#D9D9D9",
              }}
            />
          </Grid>
          <Grid container item p={0}>
            <Typography
              sx={{
                fontSize: "16px",
                fontWeight: 600,
                marginBottom: 0,
                color: "#2F2564",
                lineHeight: "19.36px",
              }}
              gutterBottom
              variant="subtitle1"
              component="div"
            >
              {postName}
            </Typography>
          </Grid>
          <Grid container item p={0}>
            <Typography
              sx={{
                fontSize: "14px",
                fontWeight: 500,
                marginBottom: 0,
                color: "#2F2564",
                lineHeight: "16.94px",
              }}
              gutterBottom
              variant="subtitle1"
              component="div"
            >
              {postDescription}
            </Typography>
          </Grid>
          {imgURL && (
            <Grid item>
              <Img alt="complex" src={imgURL} />
            </Grid>
          )}
          {!imgURL && (
            <Grid item>
              <TempDiv />
            </Grid>
          )}
        </Grid>
        <Grid
          container
          alignItems={"flex-start"}
          sx={{
            width: "100%",
          }}
        >
          <Grid
            container
            paddingLeft={5}
            paddingRight={10}
            paddingTop={3}
            justifyContent={"space-between"}
            alignItems={"flex-start"}
          >
            <Grid
              sx={{
                display: "flex",
                justifyContent: "space-between",
                width: "14%",
              }}
              item
            >
              <Typography
                sx={{
                  fontSize: "14px",
                  fontWeight: 400,
                  lineHeight: "16.94px",
                  marginBottom: 0,
                  color: "#C2478A",
                }}
                gutterBottom
                variant="subtitle1"
                component="div"
              >
                {!activity ? 0 : activity?.length}
              </Typography>
              <Typography
                sx={{
                  fontSize: "14px",
                  fontWeight: 400,
                  lineHeight: "16.94px",
                  marginBottom: 0,
                  color: " #2F2564",
                }}
                gutterBottom
                variant="subtitle1"
                component="div"
              >
                Likes
              </Typography>
            </Grid>
            <Grid
              sx={{
                display: "flex",
                justifyContent: "space-between",
                width: "20%",
              }}
              item
            >
              <Typography
                sx={{
                  fontSize: "14px",
                  fontWeight: 400,
                  lineHeight: "16.94px",
                  marginBottom: 0,
                  color: "#C2478A",
                }}
                gutterBottom
                variant="subtitle1"
                component="div"
              >
                {!activity ? 0 : ""}
              </Typography>
              <Typography
                sx={{
                  fontSize: "14px",
                  fontWeight: 400,
                  lineHeight: "16.94px",
                  marginBottom: 0,
                  color: " #2F2564",
                }}
                gutterBottom
                variant="subtitle1"
                component="div"
              >
                Comments
              </Typography>
            </Grid>
            <Grid
              item
              container
              marginTop={3}
              marginBottom={3}
              sx={{
                display: "flex",
                paddingTop: "12px",
                paddingBottom: "12px",
                alignItems: "flex-start",
                borderTop: " 0.5px solid #D9D9D9",
                borderBottom: " 0.5px solid #D9D9D9",
              }}
            >
              <Grid
                container
                alignItems={"center"}
                // padding={2}
                justifyContent={"space-between"}
                item
              >
                <Grid
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Favorite
                    fontSize="large"
                    sx={{
                      fill: !liked ? "white" : "red",
                      stroke: !liked ? "black" : "red",
                    }}
                    onClick={handleLike}
                  />
                  Like
                </Grid>
                <Grid
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <ChatBubbleOutline
                    fontSize="large"
                    sx={{ stroke: "black", fill: "white" }}
                  />
                  Comment
                </Grid>{" "}
                <Grid
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Share
                    fontSize="large"
                    sx={{ stroke: "black", fill: "white" }}
                  />
                  Share
                </Grid>
              </Grid>
            </Grid>
            <Grid
              item
              container
              paddingTop={5}
              paddingBottom={10}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderBottom: " 0.5px solid #D9D9D9",
              }}
            >
              <Typography
                sx={{
                  fontSize: "16px",
                  fontWeight: 400,
                  lineHeight: "16.94px",
                  marginBottom: 0,
                  color: "#C2478A",
                }}
                gutterBottom
                variant="subtitle1"
                component="div"
              >
                {!activity && <> No comments Found</>}
              </Typography>
            </Grid>
            <Grid marginTop={3}>
              <div
                style={{ display: "flex", alignItems: "center", gap: "20px" }}
              >
                <input
                  style={{
                    width: "442px",
                    height: "49px",
                    borderRadius: "10px",
                    border: "1px solid #D9D9D9",
                  }}
                  placeholder="Add your Comments here"
                  onChange={(e) => setComment(e.target.value)}
                />
                <Send onClick={handleComment} fontSize="large" />
              </div>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};
export default ViewPostCard;
