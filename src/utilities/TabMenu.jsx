import * as React from "react";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import AccordionExpandDefault from "./AccordianCard";

export default function TabMenu({ explainerType, solutionType }) {
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <TabContext value={value} variant="fullwidth">
      <TabList
        variant="fullwidth"
        onChange={handleChange}
        aria-label="lab API tabs example"
        centered
        sx={{
          "& .MuiTabs-indicator": {
            backgroundColor: "#FD939F",
            height: "4px",
          },
          "& .MuiTab-textColorPrimary": {
            color: "#BEBEBE",
          },
          "& .Mui-selected": {
            color: "#FFFFFF !important",
            // fontWeight:"600",
            // fontSize:"20px"
          },
          "& .MuiTab-root": {
            fontWeight: "600",
            fontSize: "20px",
          },
        }}
      >
        <Tab label="Explainer" value="1" sx={{ width: "50%" }} />
        <Tab label="Solution" value="2" sx={{ width: "50%" }} />
      </TabList>
      <TabPanel
        // className={styles.tabPanelStyle}
        sx={{
          "& MuiTabPanel-root": {
            padding: "0px !important",
          },
        }}
        value="1"
      >
        <AccordionExpandDefault item={explainerType} />
      </TabPanel>
      <TabPanel
        sx={{
          "& MuiTabPanel-root": {
            padding: "0px !important",
          },
        }}
        value="2"
      >
        <AccordionExpandDefault item={solutionType} />
      </TabPanel>
    </TabContext>
  );
}
