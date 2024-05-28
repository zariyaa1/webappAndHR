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
});

const ComplexGrid = ({ imgURL, mainText, subText, onClick,width }) => {

  const defaultPaperStyles = {
    p: 1,
    paddingLeft:0,
    margin: "1%",
    maxWidth: 250,
    flexGrow: 1,
    backgroundColor: "transparent",
    boxShadow: "none",
    cursor: "pointer",
  };

  const paperStyles = {
    ...defaultPaperStyles,
    ...(width && { maxWidth: width }), 
  };


  return (
    <Paper
      sx={paperStyles}
    >
      <Grid onClick={onClick} container spacing={1}>
        <Grid item>
          <Img alt="complex" src={imgURL} />
        </Grid>
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
              <Typography
                sx={{
                  fontSize: "20px",
                  fontWeight: 700,
                  marginBottom: 0,
                  color: "#FD939F",
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
                  fontSize: "16px",
                  fontWeight: 400,
                  letterSpacing: 0,
                }}
                variant="body2"
                gutterBottom
              >
                {subText}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};
export default ComplexGrid;
