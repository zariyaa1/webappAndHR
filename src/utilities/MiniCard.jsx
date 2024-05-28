import * as React from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

const MiniCard = ({ imgURL, name, subText, onClick }) => {
  return (
    <Paper
      sx={{
        p: 0,
        margin: "1%",
        maxWidth: 345,
        maxHeight: 118,
        flexGrow: 1,
        backgroundColor: "transparent",
        boxShadow: "none",
      }}
    >
      <div
        onClick={onClick}
        style={{
          width: 345,
          height: 118,
          cursor: "pointer",
          overflow: "hidden",
          borderRadius: "10px",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            backgroundImage: `url(${imgURL})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            borderRadius: "10px",
          }}
        >
          <Grid container spacing={1}>
            <Typography
              gutterBottom
              variant="subtitle1"
              component="div"
              sx={{
                paddingLeft: "5%",
                paddingTop: "6%",
                fontSize: "20px",
                fontWeight: "700",
                maxWidth: "100px",
                lineHeight: "25px",
                color: "#FFFFFF",
              }}
            >
              {name}
            </Typography>
          </Grid>
        </div>
      </div>
    </Paper>
  );
};

export default MiniCard;
