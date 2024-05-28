import * as React from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import BottomIcons from "./BottomIcons";
import TimeDifferenceCalculator from "./TimeDifference";

const Img = styled("img")({
  margin: "auto",
  display: "block",
  width: 482,
  height: 386,
  borderRadius: "10px",
});

const CommunityCard = ({
  imgURL,
  userName,
  postTime,
  postName,
  postDescription,
  onClick,
  width,
}) => {
  const defaultPaperStyles = {
    p: 1,
    margin: 4,
    width: 511,
    // height: 679,
    flexGrow: 1,
    backgroundColor: "#FFFFFF",
    boxShadow: "none",
    // cursor: "pointer",
    borderRadius: "15px",
  };

  const paperStyles = {
    ...defaultPaperStyles,
    ...(width && { maxWidth: width }),
  };

  return (
    <Paper sx={paperStyles}>
      <Grid
        onClick={onClick}
        container
        padding={2}
        paddingBottom={1.5}
        spacing={1}
      >
        <Grid container alignItems={"center"} justifyContent={"space-between"}>
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
        <Grid item>
          <Img alt="complex" src={imgURL} />
        </Grid>

        <Grid
          paddingTop={1.2}
          container
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Grid item paddingLeft={2}>
            <Typography
              sx={{
                fontSize: "14px",
                fontWeight: 400,
                lineHeight: "16.94px",
                marginBottom: 0,
                color: "#2F2564",
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
              alignItems: "center",
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
              6
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
        </Grid>
      </Grid>
      <Grid
        container
        padding={2}
        sx={{
          borderTop: " 0.5px solid #989898",
          width: "100%",
        }}
      >
        <BottomIcons />
      </Grid>
    </Paper>
  );
};
export default CommunityCard;
