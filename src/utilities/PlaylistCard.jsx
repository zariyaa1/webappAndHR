import * as React from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
  borderRadius: "10px",
  width: "197px",
  height: "160px",
});

const PlaylistCard = ({ imgURL, mainText, onClick }) => {
  return (
    <Paper
      sx={{
        p: 0,
        margin: "1%",
        maxWidth: 210,
        flexGrow: 1,
        backgroundColor: "transparent",
        boxShadow: "none",
        cursor: "pointer",
      }}
    >
      <Grid onClick={onClick} container spacing={1}>
        <Img alt="complex" src={imgURL} sx={{ objectFit: "cover" }} />
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
              <Typography
                sx={{
                  fontSize: "15px",
                  fontWeight: 700,
                  marginBottom: 0,
                  color: "#FD939F",
                  letterSpacing: 0,
                  lineHeight: 1.3,
                }}
                gutterBottom
                variant="subtitle1"
                component="div"
              >
                {mainText}
              </Typography>
              <Typography
                sx={{
                  color: "#FFFFFF",
                  fontSize: "12px",
                  fontWeight: 400,
                  letterSpacing: 0,
                }}
                variant="body2"
                gutterBottom
              ></Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};
export default PlaylistCard;
