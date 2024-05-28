import styles from "../HealingDetailsComponent/index.module.css";
import * as React from "react";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { useParams } from "react-router-dom";
import PlaylistCard from "../../../utilities/PlaylistCard";
import VideoModal from "../../../utilities/VideoModal";
import playImage from "../../../assets/images/playBtn.svg";
import axios from "../../../services/axios";
import { getPlaylistData } from "../../../services/mainData";

const BackgroundImg = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
  // borderRadius: "10px",
  width: "100%",
  height: "460px",
});

const HealingContentComp = () => {
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

  const handleClick = () => {
    setOpen(!open);
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

        <div
          style={{
            position: "relative",
          }}
        >
          <BackgroundImg
            sx={{
              objectFit: "cover",

              background:
                "linear-gradient(2.91deg, rgba(0, 0, 0, 0.6) 29.36%, rgba(0, 0, 0, 0) 98.1%)",
            }}
            alt="complex"
            src={healingDetailsData?.mediaLink}
          />
          <div
            style={{
              position: "absolute",
              top: "50%",
              bottom: "50%",
              left: "50%",
              right: "50%",
            }}
          >
            <img src={playImage} alt="play-btn" />
          </div>
          <div
            style={{
              position: "absolute",
              zIndex: "1",
              bottom: "14%",
              left: "4.5%",
            }}
          >
            <Typography
              sx={{
                fontSize: "36px",
                fontWeight: 700,
                marginBottom: 0,
                color: "#FFFFFF",
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
          </div>
        </div>

        <div className={styles.playlistContainer}>
          {playlistData?.map((item) => (
            <PlaylistCard
              key={item._id}
              imgURL={item.contentId.thumbnail}
              mainText={item.contentId.title}
              onClick={() =>
                handleOpenModal(
                  item.contentId.mediaLink,
                  item?.contentId?._id,
                  item?.playlistId?._id
                )
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HealingContentComp;
