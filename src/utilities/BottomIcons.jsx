import React from "react";
import HeartIcon from "../assets/icons/heartIcon.svg";
import CommentIcon from "../assets/icons/commentIcon.svg";
import ShareIcon from "../assets/icons/shareIcon.svg";
import Grid from "@mui/material/Grid";

const iconsData = [
  {
    icon: HeartIcon,
    title: "Like",
  },
  {
    icon: CommentIcon,
    title: "Comment",
  },
  {
    icon: ShareIcon,
    title: "Share",
  },
];

const BottomIcons = () => {
  return (
    <Grid
      container
      alignItems={"center"}
      // padding={2}
      justifyContent={"space-between"}
      item
    >
      {iconsData?.map((data) => (
        <Grid
          sx={{
            display: "flex",
            alignItems: "center",
          }}
          item
          key={data?.title}
        >
          <img
            style={{
              paddingRight: "11px",
            }}
            src={data.icon}
            alt={data.title}
          />
          {data.title}
        </Grid>
      ))}
    </Grid>
  );
};

export default BottomIcons;
