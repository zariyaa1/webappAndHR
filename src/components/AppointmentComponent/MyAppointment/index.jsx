import React, { useEffect, useState } from "react";
import styles from "./index.module.css";
import toast, { Toaster } from "react-hot-toast";

import TableComponent from "./TableComponent";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import {
  deleteAppointment,
  fetchCancelledAppointment,
  fetchCompletedAppointment,
  fetchTableData,
} from "../../../services/appointment";
import { Button, Modal, TextField } from "@mui/material";
import LocalStorageService from "../../../utilities/LocalStorageService";

const userId = LocalStorageService.getID();

const Popup = ({ open, onClose, onSubmit }) => {
  const [inputValue, setInputValue] = useState("");

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = () => {
    onSubmit(inputValue);
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <div
        className="popup"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          backgroundColor: "white",
          padding: 20,
        }}
      >
        <h2 id="modal-title">Enter Cancel Reason</h2>
        <TextField
          id="data-input"
          // label="Data"
          value={inputValue}
          onChange={handleChange}
          variant="outlined"
          fullWidth
          autoFocus
          required
        />
        <Button
          variant="contained"
          onClick={handleSubmit}
          style={{ marginTop: 20 }}
        >
          Submit
        </Button>
        <Button
          variant="contained"
          onClick={onClose}
          style={{ marginTop: 20, marginLeft: 10 }}
        >
          Close
        </Button>
      </div>
    </Modal>
  );
};

const UpcomingAppointments = ({ tableData }) => {
  const [cancelPopupOpen, setCancelPopupOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);

  const handleCancelBtn = (row) => {
    setSelectedRow(row);
    setCancelPopupOpen(true);
  };

  const handleClosePopup = () => {
    setCancelPopupOpen(false);
    setSelectedRow(null);
  };

  const handleCancelSubmit = (cancelReason) => {
    if (selectedRow) {
      const tableId = selectedRow?._id;
      deleteAppointment(tableId, cancelReason)
        .then((res) => {
          if (res.status === 200) {
            toast.success(res?.data?.message, {
              duration: 1000,
            });
          } else {
            toast.error("Something Went Wrong", {
              duration: 1000,
            });
          }
        })
        .catch((err2) => {});
    } else {
    }
  };

  const handleRescheduleBtn = () => {
    console.log("reschedule clicked");
  };

  return (
    <div className={styles.tableContainer}>
      {tableData ? (
        <TableComponent
          handleCancelBtn={handleCancelBtn}
          handleRescheduleBtn={handleRescheduleBtn}
          tableData={tableData}
        />
      ) : (
        <div className={styles.blankData}>No Data Found</div>
      )}
      <Popup
        open={cancelPopupOpen}
        onClose={handleClosePopup}
        onSubmit={handleCancelSubmit}
      />
    </div>
  );
};

const CancelledAppointments = ({ cancelledData }) => {
  return (
    <div className={styles.tableContainer}>
      {cancelledData ? (
        <TableComponent tableData={cancelledData} type="completed" />
      ) : (
        <div className={styles.blankData}>No Data Found</div>
      )}
    </div>
  );
};
const CompletedAppointments = ({ completedData }) => {
  return (
    <div className={styles.tableContainer}>
      {completedData ? (
        <TableComponent tableData={completedData} type="completed" />
      ) : (
        <div className={styles.blankData}>No Data Found</div>
      )}
    </div>
  );
};

function TabMenu({ tableData, cancelledData, completedData }) {
  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={styles.tabContainer}>
      <TabContext value={value} variant="fullwidth">
        <div className={styles.tabholder}>
          <TabList
            variant="fullwidth"
            onChange={handleChange}
            aria-label="lab API tabs example"
            centered
            sx={{
              // backgroundColor: "#F5F5F5",

              "& .MuiTabs-indicator": {
                backgroundColor: "transparent",
              },
              "& .MuiTab-textColorPrimary": {
                color: "#2F2564",
              },
              "& .Mui-selected": {
                color: "#FFFFFF !important",
                backgroundColor: "#C2478A !important",
              },
              "& .MuiTabs-flexContainer": {
                backgroundColor: "#F5F5F5",
                borderRadius: "30px",
                // width: "fit-content",
                justifyContent: "space-between",
                // width:"95%",
                // margin:"auto"
              },
              "& .MuiTab-root": {
                fontWeight: "700",
                fontSize: "20px",
                backgroundColor: "#F5F5F5",
                borderRadius: "30px",

                textTransform: "none",
              },
              "& .MuiTabs-scroller": {
                // backgroundColor: "#F5F5F5",
                borderRadius: "30px",
              },
            }}
          >
            <Tab label="Upcoming" value="1" sx={{ width: "33.33%" }} />
            <Tab label="Completed" value="2" sx={{ width: "33.33%" }} />
            <Tab label="Cancelled" value="3" sx={{ width: "33.33%" }} />
          </TabList>
        </div>
        <TabPanel
          className={styles.tabPanelStyle}
          sx={{
            "& MuiTabPanel-root": {
              padding: "0px !important",
            },
          }}
          value="1"
        >
          <UpcomingAppointments tableData={tableData} />
        </TabPanel>
        <TabPanel
          className={styles.tabPanelStyle}
          sx={{
            "& MuiTabPanel-root": {
              padding: "0px !important",
            },
          }}
          value="2"
        >
          <CompletedAppointments completedData={completedData} />
        </TabPanel>
        <TabPanel
          className={styles.tabPanelStyle}
          sx={{
            "& MuiTabPanel-root": {
              padding: "0px !important",
            },
          }}
          value="3"
        >
          <CancelledAppointments cancelledData={cancelledData} />
        </TabPanel>
      </TabContext>
    </div>
  );
}

const MyAppointment = () => {
  const [tableData, setTableData] = useState();
  const [cancelledData, setCancelledData] = useState();
  const [completedData, setCompletedData] = useState();

  useEffect(() => {
    if (userId) {
      fetchTableData(userId)
        .then((res) => {
          if (res.status === 200) {
            console.log(res);
            setTableData(res?.data?.data);
          }
        })
        .catch((err2) => {
          console.log(err2);
        });
      fetchCompletedAppointment(userId)
        .then((res) => {
          if (res.status === 200) {
            setCompletedData(res?.data?.data);
          }
        })
        .catch((err2) => {
          console.log(err2);
        });
      fetchCancelledAppointment(userId)
        .then((res) => {
          if (res.status === 200) {
            setCancelledData(res?.data?.data);
          }
        })
        .catch((err2) => {
          console.log(err2);
        });
    } else {
    }
  }, [userId]);

  return (
    <div className={styles.container}>
      <div className={styles.mainContainer}>
        <div className={styles.heading}>My Appointments</div>
        <div className={styles.tableContainer}>
          <TabMenu
            cancelledData={cancelledData}
            completedData={completedData}
            tableData={tableData}
          />
        </div>
        <Toaster />
      </div>
    </div>
  );
};

export default MyAppointment;
