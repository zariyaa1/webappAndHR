import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import plant from "../assets/icons/plant.svg";
import { styled } from "@mui/material/styles";
import { Rating } from "@mui/lab";
import "./video.css";
import LocalStorageService from "./LocalStorageService";
import { sendFeedback } from "../services/feedback";
import toast, { Toaster } from "react-hot-toast";
import { increasePlant } from "../services/Activity";
const style = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};
const style2 = {
  display: "flex",
  flexDirection: "column",
  width: "350px",
  height: "450px",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#fbdbc6",
  borderRadius: "16px",
  padding: "16px",
};
const StyledRating = styled(Rating)({
  "& .MuiRating-iconFilled": {
    color: "#ff6d75",
  },
  "& .MuiRating-iconHover": {
    color: "#ff3d47",
  },
});

const VideoModal = ({ videoUrl, open, onClose, contentId, playlistId }) => {
  const [vm, setVm] = React.useState(true);
  const [pm, setPm] = React.useState(false);
  const [value, setValue] = React.useState(2);
  const [text, setText] = React.useState("");
  const id = LocalStorageService.getID();
  const [openvm, setOpenvm] = React.useState(open);
  const myCallback = () => {
    setPm(true);
  };

  const handleFMsubmit = () => {
    const date = Date.now();
    const data = {
      userId: id,
      target: "content",
      targetId: contentId,
      rating: value,
      review: text,
    };

    const valueD = {
      playlistId: playlistId,
      contentId: contentId,
      status: "completed",
      date: date,
      mins: 1,
    };

    sendFeedback(data)
      .then((res) => {
        increasePlant(valueD)
          .then((res) => {
            toast.success("Feedback Submitted Successfully", {
              duration: 2000,
            });
            setPm(false);
            onClose();
          })
          .catch((err) => {
            toast.error("Please try again later", {
              duration: 2000,
            });
            setPm(false);
            onClose();
          });
      })
      .catch((err) => {
        toast.error(err?.response?.data?.message, { duration: 2000 });
        setPm(false);
        onClose();
      });
  };

  return (
    <div>
      <Toaster />
      {pm && (
        <Modal
          open={openvm}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            justifyContent: "center",
            backgroundColor: "rgba(194, 71, 138, 0.7)",
          }}
        >
          <Box sx={style2}>
            <span className="head1">Hey You've earned a plant.</span>
            <img className="vdImg" src={plant} />
            <span className="head2">Thank you for watching</span>
            <span className="head3">
              We would love to hear your thoughts and feedback on this video.
            </span>
            <StyledRating
              name="simple-controlled"
              value={value}
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
            />
            <textarea
              rows={5}
              cols={30}
              className="head4"
              value={text}
              onChange={(event) => {
                setText(event.target.value);
              }}
            />

            <button className="btn" onClick={handleFMsubmit}>
              Submit
            </button>
          </Box>
        </Modal>
      )}
      {vm && (
        <Modal
          open={open}
          onClose={onClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(194, 71, 138, 0.7)",
          }}
        >
          <Box style={{ maxWidth: "70%", maxHeight: "70%" }}>
            <video
              controls
              autoPlay
              style={{ maxWidth: "100%", maxHeight: "100%" }}
              onClick={(e) => e.stopPropagation()}
              onEnded={() => myCallback()}
            >
              <source src={videoUrl} type="video/mp4" />
              {/* Your browser does not support the video tag. */}
            </video>
          </Box>
        </Modal>
      )}
    </div>
  );
};
export default VideoModal;
