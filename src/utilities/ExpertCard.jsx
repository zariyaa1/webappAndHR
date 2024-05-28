import * as React from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { ButtonBase } from "@mui/material";

const ExpertCard = ({
  header,
  description,
  btnText,
  profile,
  onClick,
  btnColor,
  btnBackColor,
  pCardUrl,
  name,
  type,
}) => {
  return (
    <Paper
      sx={{
        p: 0,
        margin: "1%",
        maxWidth: 345,
        maxHeight: 145,
        flexGrow: 1,
        backgroundColor: "transparent",
        boxShadow: "none",
      }}
    >
      <div
        onClick={onClick}
        style={{
          width: 345,
          height: 145,
          cursor: "pointer",
          overflow: "hidden",
          borderRadius: "10px",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            background: "linear-gradient(180deg, #CA528D 0%, #F3869C 100%)", // Corrected background gradient syntax
            backgroundSize: "cover",
            backgroundPosition: "center",
            borderRadius: "10px",
          }}
        >
          <Grid container spacing={2}>
            <Grid item>
              {/* <Img alt="complex" src="/static/images/grid/complex.jpg" /> */}
            </Grid>
            <Grid item xs={12} sm container>
              <Grid item xs container direction="column" spacing={2}>
                <Grid item xs justifyContent="space-between">
                  <Typography
                    sx={{
                      fontWeight: 700,
                      fontSize: "15px",
                      color: "#FFFFFF",
                      paddingTop: "7px",
                    }}
                    variant="subtitle1"
                    component="div"
                  >
                    {header}
                  </Typography>
                  <Typography
                    sx={{
                      fontWeight: 400,
                      fontSize: "15px",
                      color: "#FFFFFF",
                    }}
                    variant="subtitle1"
                  >
                    {description}
                  </Typography>
                  <Typography
                    sx={{
                      fontWeight: 600,
                      fontSize: "15px",
                      color: "#2F2564",
                    }}
                    variant="subtitle1"
                  >
                    {name}
                  </Typography>
                  <Typography
                    sx={{
                      fontWeight: 400,
                      fontSize: "15px",
                      color: "#FFFFFF",
                    }}
                    variant="subtitle1"
                    gutterBottom
                  >
                    {type}
                  </Typography>
                </Grid>
                <Grid item>
                  <ButtonBase
                    sx={{
                      width: 159,
                      height: 25,
                      backgroundColor: `${btnBackColor}`,
                      borderRadius: "20px",
                      color: `${btnColor}`,
                      fontSize: "12px",
                      fontWeight: "700",
                      display: "flex",
                    }}
                  >
                    {btnText}
                  </ButtonBase>
                </Grid>
              </Grid>
              <Grid
                sx={{
                  paddingRight: "2%",
                  paddingTop: "2%",
                }}
                item
              >
                <img src={pCardUrl} alt="profile-card" />
              </Grid>
            </Grid>
          </Grid>
        </div>
      </div>
    </Paper>
  );
};

export default ExpertCard;
