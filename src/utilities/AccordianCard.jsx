import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import VideoModal from "./VideoModal";

export default function AccordionExpandDefault({ item }) {
  const [expandedIndex, setExpandedIndex] = React.useState(0);
  const [openModal, setOpenModal] = React.useState(false);
  const [videoUrl, setVideoUrl] = React.useState("");

  const handleChange = (panelIndex) => {
    setExpandedIndex(panelIndex === expandedIndex ? -1 : panelIndex);
  };
  const handleTypeClick = (item) => {
    setVideoUrl(item?.mediaLink);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setVideoUrl("");
    setOpenModal(false);
  };

  return (
    <div>
      {videoUrl && (
        <VideoModal
          open={openModal}
          onClose={handleCloseModal}
          videoUrl={videoUrl}
          // contentId={contentId}
        />
      )}
      {item?.map((accordionItem, panelIndex) => (
        <Accordion
          key={panelIndex}
          expanded={panelIndex === expandedIndex}
          onChange={() => handleChange(panelIndex)}
          sx={{
            background: "transparent",
            boxShadow: "none",
            color: "#FFFFFF",
            "&.MuiAccordion-root::before": {
              backgroundColor: "#FD939F",
            },
          }}
        >
          <AccordionSummary
            expandIcon={<ArrowDownwardIcon style={{ color: "#FD939F" }} />}
            aria-controls={`panel${panelIndex + 1}-content`}
            id={`panel${panelIndex + 1}-header`}
          >
            <Typography
              sx={{
                borderRadius: "50%",
                paddingLeft: "7px",
                paddingRight: "7px",
                height: "24px",
                fontSize: "16px",
                fontWeight: "700",

                border: "2px solid #fd939f",
                marginRight: "5%",
              }}
            >
              {panelIndex + 1}
            </Typography>
            <Typography
              sx={{
                fontSize: "16px",
                fontWeight: "700",
              }}
            >
              {accordionItem?.contentId?.title}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography
              sx={{
                fontSize: "16px",
                fontWeight: "500",
              }}
            >
              {accordionItem?.contentId?.description}
            </Typography>
          </AccordionDetails>
          <div
            onClick={() => {
              handleTypeClick(accordionItem.contentId);
            }}
            style={{
              width: "100%",
              background: "#c2478a",
              textAlign: "center",
              borderRadius: "30px",
              paddingTop: "8px",
              paddingBottom: "8px",
              color: "#ffffff",
              marginTop: "10px",
              marginBottom: "10px",
              cursor: "pointer",
            }}
          >
            Play
          </div>
        </Accordion>
      ))}
    </div>
  );
}
