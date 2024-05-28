import React from "react";
import { Grid, Paper, Typography, ButtonBase } from "@mui/material";

const ResourceCard = ({ imgUrl, title, onClick }) => {
  return (
    <Paper
      sx={{
        p: 1,
        margin: "0",
        marginLeft: 0,
        maxWidth: "24vw",
        // maxHeight: 285,
        flexGrow: 1,
        backgroundColor: "transparent",
        boxShadow: "none",
        cursor: "pointer",
      }}
    >
      <Grid
        item
        onClick={onClick}
        container
        // xs={4}
        style={{
          position: "relative",
          marginTop: "5%",
          background: `linear-gradient(rgba(47, 37, 100, 0.7), rgba(47, 37, 100, 0.7)),url("${imgUrl}") center/cover `,
          color: "#ffffff",
          padding: "20px",
          // width: "344px",
          height: "285px",
          borderRadius: "20px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <ButtonBase
          sx={{
            backgroundColor: "#E15C5C",
            borderRadius: "20px",
            fontSize: "12px",
            fontWeight: "700",
            width: 98,
            height: 25,
          }}
        >
          Blog Post
        </ButtonBase>
        <Typography
          gutterBottom
          variant="subtitle1"
          component="div"
          sx={{
            paddingLeft: "2%",
            fontSize: "15px",
            fontWeight: "700",
          }}
        >
          {title}
        </Typography>
        <ButtonBase
          sx={{
            width: 119,
            height: 25,
            backgroundColor: "#FBBECE",
            borderRadius: "20px",
            color: "#2F2564",
            fontSize: "12px",
            fontWeight: "700",
          }}
        >
          Know More
        </ButtonBase>
      </Grid>
    </Paper>
  );
};

export default ResourceCard;
