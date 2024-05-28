import styles from "./index.module.css";
import * as React from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { useNavigate, useParams } from "react-router-dom";
import Button from "@mui/material/Button";
import PlaylistCard from "../../../utilities/PlaylistCard";
import VideoModal from "../../../utilities/VideoModal";
import playImage from "../../../assets/images/playBtn.svg";
import axios from "../../../services/axios";
import { getPlaylistData } from "../../../services/mainData";

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "35%",
  maxHeight: "100%",
  borderRadius: "10px",
});

const BackgroundImg = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
  // borderRadius: "10px",
  width: "100%",
  height: "460px",
});

const HealingDetailsComponent = () => {
  const { healingId } = useParams();
  const [healingDetailsData, setHealingDetailsData] = React.useState([]);
  const [healingPlaylistId, setHealingPlaylistId] = React.useState();
  const [playlistData, setPlaylistData] = React.useState([]);
  const [videoUrl, setVideoUrl] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [contentId, setContentId] = React.useState("");
  const [playlistId, setPlaylistId] = React.useState("");

  React.useEffect(() => {
    const fetchData = async () => {
      if (healingId) {
        try {
          const [details, playlist] = await Promise.all([
            axios.get(`content-service/apis/category/${healingId}`),
            axios.get(`content-service/apis/playlist?categoryId=${healingId}`),
          ]);
          setHealingDetailsData(details?.data);
          setHealingPlaylistId(playlist?.data?.data?.[0]?._id);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    };

    fetchData();
  }, [healingId]);

  React.useEffect(() => {
    if (healingPlaylistId) {
      getPlaylistData(healingPlaylistId)
        .then((res) => {
          if (res.status === 200) {
            setPlaylistData(res?.data?.data);
          }
        })
        .catch((err2) => {
          console.log(err2);
        });
    } else {
      console.log("not hitting api");
    }
  }, [healingPlaylistId]);
  const navigate = useNavigate();

  const handleClick = (card) => {
    navigate(`/healingtools/content/${healingId}`);
  };
  const [openModal, setOpenModal] = React.useState(false);

  const handleOpenModal = (videoUrl, id, Pid) => {
    setVideoUrl(videoUrl);
    setOpenModal(true);
    setContentId(id);
    setPlaylistId(Pid);
  };
  const handleCloseModal = () => {
    setVideoUrl("");
    setOpenModal(false);
  };

  return (
    <div className={styles.container}>
      <div
        style={{
          height: "100vh",
          overflowY: "scroll",
        }}
      >
        {videoUrl && (
          <VideoModal
            open={openModal}
            onClose={handleCloseModal}
            videoUrl={videoUrl}
            contentId={contentId}
            playlistId={playlistId}
          />
        )}
        {!videoUrl && !open && (
          <>
            <div className={styles.heading}>Healing Tools</div>

            <Paper
              sx={{
                p: 1,
                margin: "4%",
                maxWidth: "80%",
                flexGrow: 1,
                backgroundColor: "transparent",
                boxShadow: "none",
              }}
            >
              <Grid container spacing={1}>
                <Img alt="complex" src={healingDetailsData?.mediaLink} />
                <Grid
                  item
                  xs={12}
                  sm
                  container
                  sx={{
                    position: "relative",
                  }}
                >
                  <Grid
                    item
                    xs
                    container
                    direction="column"
                    sx={{
                      position: "absolute",
                      bottom: "0",
                      marginLeft: "1%",
                    }}
                    spacing={2}
                  >
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
                        {healingDetailsData?.name}
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
                        {healingDetailsData?.description}
                      </Typography>
                      <Button
                        sx={{
                          color: "#FFFFFF",
                          backgroundColor: "#C2478A",
                          borderRadius: "30px",
                          width: "40%",
                          "&:hover": {
                            backgroundColor: "#C2478A",
                          },
                        }}
                        variant="contained"
                        onClick={() => {
                          handleClick(healingDetailsData);
                        }}
                      >
                        Listen
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
          </>
        )}
      </div>
    </div>
  );
};

export default HealingDetailsComponent;
