import React, { useState, useEffect } from "react";
import styles from "./index.module.css";
import { DateRange } from "react-date-range";
import "./date-range.css";
import LocalStorageService from "../../../utilities/LocalStorageService";
import AdminMainComp from "../AdminMain";
import AdminSideStatsComp from "../AdminStatsSidebar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { AccountCircleRounded, Padding } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import AdminSurveyComp from "../Surveys";
import { useContext } from "react";
import { DateRangeContext } from "../../../store/context";
import { getReportAPICALL } from "../../../services/Reports"

import * as XLSX from 'xlsx/xlsx.mjs';
const buttonData = [
  {
    text: "ALL TIME",
  },
  {
    text: "LAST WEEk",
  },
  {
    text: "LAST MONTH",
  },
  {
    text: "LAST QUATER",
  },
  {
    text: "LAST YEAR"
  },
  {
    text: "CUSTOM",
  },
];


const AdminNavbarComp = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const openMenu = Boolean(anchorEl);
  const [check, setCheck] = useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };


  // TODO: Remove date state fromDate and endDate is need . date does not need it.
  // need to change the structure of the state here 
  const [date, setDate] = useState();
  const [state, setState] = useContext(DateRangeContext);


  const [classname, setClassname] = useState(new Array(5).fill(""));
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const newArr = [...classname];
    newArr[0] = true;
    // Why these is need ?
    setClassname(newArr);
    if (window.location.pathname === "/dashboard/surveys") {
      setCheck(true);
    }
  }, []);


  const [userDistribution, SetuserDistribution] = useState(null);
  const [moodDistribution, SetmoodDistribution] = useState(null);
  const [sleepDistribution, setSleepDistribution] = useState(null);
  const [issueDistribution, setIssueDistribution] = useState(null);
  const [preferenceDistribution, setPreferenceDistribution] = useState(null);
  const [Reviews, setReviews] = useState(null);
  const [sessionStats, setSessionStat] = useState(null);
  const [sessionRating, setSessionRating] = useState(null);

  // excel report
  // const handleReportDownload = () => {
  //   const data = {
  //     usersDistribution: userDistribution,
  //     usersMoodDistribution: moodDistribution,
  //     userSleepDistribution: sleepDistribution,
  //     usersIssueDistribution: issueDistribution,
  //     userPreferenceDistribution: preferenceDistribution,
  //     userReviews: Reviews,
  //     usersSessionRating: sessionRating,
  //     userSessionStats: sessionStats,
  //   }


  //   GenerateXLSXFile(state[0].startDate || 'alltime', state[0].endDate || 'alltime', data)


  // }



  const changeClass = (index) => {
    const newArr = new Array(5).fill("");
    newArr[index] = true;
    setClassname(newArr);

    if (index === 5) {
      setOpen(true);
    } else {
      setOpen(false);
      if (index === 0) {
        setDate('');
        setState((prev) => [
          {
            startDate: null,
            endDate: null,
            key: "selection",
          },
        ]);
      } else {
        const currentDate = new Date();
        let startDate, endDate;

        if (index === 1) {
          // Last week
          startDate = getPreviousWeekStart(currentDate);
          endDate = getPreviousWeekEnd(currentDate);
        } else if (index === 2) {
          // Last month
          startDate = getPreviousMonthStart(currentDate)
          endDate = getMonthEnd(currentDate);
        } else if (index === 3) {
          // Last quarter (90 days)
          startDate = new Date(currentDate.getTime() - 89 * 24 * 60 * 60 * 1000);
          endDate = currentDate;
        } else if (index === 4) {
          // Last year (180 days)
          startDate = getlastYearEnd(currentDate)
          endDate = getLastYearStart(currentDate);
        }

        const formattedStartDate = formatDate(endDate);
        const formattedEndDate = formatDate(startDate);



        setState((prev) => [
          {
            startDate: formattedStartDate,
            endDate: formattedEndDate,
            key: "selection",
          },
        ]);
      }
    }
  };
  const handleCustom = () => {
    setOpen(false);
  };


  const handleReportDownload = async () => {


    try {
      const blobData = await getReportAPICALL();


      const blob = new Blob([blobData], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);


      const a = document.createElement('a');
      a.href = url;
      a.download = 'report.pdf';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      // Clean up the URL object
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading PDF:', error);
      alert('Error downloading PDF. Please try again.');
    }

  }
  return (
    <>
      <div className={styles.mainContainer}>
        <WishingComponent />

        <DateRangePickerComponent
          changeClass={changeClass}
          classname={classname}
          open={open}
          setState={setState}
          state={state}
          handleCustom={handleCustom}
          handleReportDownload={handleReportDownload}
        />

        <ProfileComponent
          handleClick={handleClick}
          openMenu={openMenu}
          anchorEl={anchorEl}
          handleClose={handleClose}
          handleLogout={handleLogout}
        />

      </div>


      <div className={styles.Scont}>
        {!check && (
          <>
            <AdminMainComp

              userDistribution={userDistribution}
              SetuserDistribution={SetuserDistribution}

              moodDistribution={moodDistribution}
              SetmoodDistribution={SetmoodDistribution}


              sleepDistribution={sleepDistribution}
              setSleepDistribution={setSleepDistribution}

              preferenceDistribution={preferenceDistribution}
              setPreferenceDistribution={setPreferenceDistribution}

              Reviews={Reviews}
              setReviews={setReviews}

              sessionStats={sessionStats}
              setSessionStat={setSessionStat}


              sessionRating={sessionRating}
              setSessionRating={setSessionRating}
              dated={date}

              state={state} />

            <AdminSideStatsComp
              issueDistribution={issueDistribution}
              setIssueDistribution={setIssueDistribution}

              dated={date} state={state} />
          </>
        )}

        {check && <AdminSurveyComp dated={date} state={state} />}
      </div>
    </>
  );
};


// helper components and function
const DateRangePickerComponent = ({ handleReportDownload, changeClass, classname, open, setState, state, handleCustom }) => {

  return (<>
    <div className={{ display: "flex", flexDirection: "column", }}>
      <div className={styles.btnscontainer}>
        <div className={styles.buttonContainer}>
          {buttonData.map((data, index) => (
            <button
              onClick={(e) => changeClass(index)}
              className={!classname[index] ? styles.btn : styles.btn_active}
            >
              {data.text}
            </button>
          ))}
        </div>


        {open && (
          <div className={styles.dateContainer}>
            <DateRange
              editableDateInputs={true}
              onChange={(item) => {
                setState([{ startDate: formatDate(item.selection.endDate), endDate: formatDate(item.selection.startDate), key: "selection", }],)
              }}
              moveRangeOnFirstSelection={false}
              ranges={state}
              direction="horizontal"
            />
            <button className={styles.drbtn} onClick={handleCustom}>
              Submit
            </button>

          </div>
        )}
        <DownloadReportComponent handleReportDownload={handleReportDownload} />
      </div>


      <DisplayDateRange startDate={state[0].startDate} endDate={state[0].endDate} />
    </div>


  </>)
}
const WishingComponent = () => {

  return (<>

    <div>
      <span className={styles.DashHead}>Dashboard</span>
      <br />
      <span className={styles.DashDesc}>
        Welcome to <span>ZariyaaHR</span>
      </span>
    </div>
  </>)
}


const DownloadReportComponent = ({ handleReportDownload }) => {
  return (<>

    <div>
      <button onClick={handleReportDownload} className={styles.downloadButton}>DOWNLOAD REPORT</button>
    </div>
  </>)
}

const ProfileComponent = ({ handleClick, openMenu, anchorEl, handleClose, handleLogout }) => {

  return (<>

    <div className={styles.profileContainer}>
      <IconButton
        onClick={handleClick}
        size="small"
        sx={{ ml: 2 }}
        aria-controls={openMenu ? "account-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={openMenu ? "true" : undefined}
      >
        <AccountCircleRounded
          sx={{ color: "#C2478a" }}
          style={{ fontSize: "50px" }}
        />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={openMenu}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&::before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <Link to="/" style={{ color: "#000000", textDecoration: "none" }}>
          <MenuItem>Home</MenuItem>
        </Link>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </div>
  </>)
}

function formatDate(date = new Date()) {

  const datePattern = /^\d{4}-\d{2}-\d{2}$/;


  if (typeof date === "string" && datePattern.test(date)) {
    return date;
  }


  const year = date.toLocaleString("default", { year: "numeric" });
  const month = date.toLocaleString("default", { month: "2-digit" });
  const day = date.toLocaleString("default", { day: "2-digit" });

  return [year, month, day].join("-");
}

const DisplayDateRange = ({ startDate, endDate }) => {
  const style = {
    padding: '10px',
    color: '#818183',
  };

  if (startDate && endDate) {
    return (
      <div style={style}>
        <span>Date range:</span>
        <span> {startDate} </span>
        <span> -</span>
        <span> {endDate}</span>
      </div>
    );
  }
};


// Excel
// const GenerateXLSXFile = (startDate, endDate, Data) => {


//   // DATA have to be in array of array
//   const { usersDistribution,
//     usersMoodDistribution,
//     userSleepDistribution,
//     usersIssueDistribution,
//     userPreferenceDistribution,
//     userReviews,
//     usersSessionRating,
//     userSessionStats
//   } = Data;


//   /**
//    * analytics computation part
//    *  
//    * */

//   let maleCount = 0;
//   let femaleCount = 0;
//   let othersCount = 0


//   usersDistribution.maleAndFemaleDistribution.forEach(element => {

//     // need to change it after changing in the data base
//     if (element.gender === "Male") {
//       maleCount += element.count
//     } else if (element.gender === "Female") {
//       femaleCount += element.count;
//     } else {
//       othersCount += element.count;
//     }

//   });


//   let UserDistributioinObject = {
//     startDate: startDate,
//     endDate: endDate,
//     totalFamilyMembers: usersDistribution.TotalFamilyMembers,
//     newFamilyMembersBetweenRange: usersDistribution.newFamilyMembersBasedOnDate,
//     newUserBetweenRange: usersDistribution.newRegistrationBasedOnDate,
//     totalUsers: usersDistribution.totalRegistration,
//     maleCount: maleCount,
//     femaleCount: femaleCount,
//     othersCount: othersCount
//   }



//   // question , answer ,  count , percentage
//   let preferenceDistributionArray = [];


//   userPreferenceDistribution.forEach((questionAndanswer) => {


//     questionAndanswer.answers.forEach((answerItem) => {

//       let preferenceDistributionObject = {
//         startDate: startDate,
//         endDate: endDate,
//         question: questionAndanswer.question,
//         answer: answerItem.answer,
//         count: answerItem.count,
//         percentage: answerItem.percentage,
//       }
//       preferenceDistributionArray.push(preferenceDistributionObject)
//     })

//     preferenceDistributionArray.push({
//       startDate: "",
//       endDate: "",
//       question: "",
//       answer: "",
//       count: "",
//       percentage: ""
//     })

//   })


//   // main issues  , percentage,  subissue percentage
//   let issueDistributionArray = [];

//   usersIssueDistribution.forEach((MainIssueAndSubIssues) => {


//     MainIssueAndSubIssues.subissues.forEach((subissueItem) => {

//       let issueDistributionObject = {
//         startDate: startDate,
//         endDate: endDate,
//         mainIssue: MainIssueAndSubIssues.question,
//         MainIssuepercentage: MainIssueAndSubIssues.percentage,
//         subIssue: subissueItem.subissue,
//         SubIssuePercentage: subissueItem.percentage
//       }
//       issueDistributionArray.push(issueDistributionObject)
//     })
//     issueDistributionArray.push({
//       startDate: "",
//       endDate: "",
//       mainIssue: "",
//       MainIssuepercentage: "",
//       subIssue: "",
//       SubIssuePercentage: ""
//     })
//   })



//   let ReviewsArray = [];

//   userReviews.forEach((reviewItem) => {

//     ReviewsArray.push({ startDate: startDate, endDate: endDate, review: reviewItem.review })
//   })

//   // let SessionStatsArray = [];

//   // userSessionStats.forEach(() => {


//   // })

//   /***
//    * 
//    * sheets generation 
//    * 
//    */

//   const workbook = XLSX.utils.book_new();


//   let usersDistributionworksheet = XLSX.utils.json_to_sheet([UserDistributioinObject]);

//   // 20 character width on each columns
//   usersDistributionworksheet["!cols"] = [
//     { wch: 20 }, { wch: 20 }, { wch: 20 }, { wch: 20 },
//     { wch: 20 }, { wch: 20 }, { wch: 20 }, { wch: 20 },
//     { wch: 20 }
//   ];



//   let userPreferenceDistributionWorkSheet = XLSX.utils.json_to_sheet(preferenceDistributionArray);

//   userPreferenceDistributionWorkSheet["!cols"] = [
//     { wch: 40 }, { wch: 40 },
//     { wch: 40 }, { wch: 40 },
//     { wch: 40 }, { wch: 40 },]


//   let userIssuesDistributionWorkSheet = XLSX.utils.json_to_sheet(issueDistributionArray);

//   userIssuesDistributionWorkSheet["!cols"] = [
//     { wch: 20 }, { wch: 20 },
//     { wch: 20 }, { wch: 20 },
//     { wch: 20 }, { wch: 20 },]



//   let ReviewsWorkSheet = XLSX.utils.json_to_sheet(ReviewsArray);

//   ReviewsWorkSheet["!cols"] = [
//     { wch: 20 }, { wch: 20 },
//     { wch: 20 },]

//   XLSX.utils.book_append_sheet(workbook, usersDistributionworksheet, "user_distribution-anlytics");
//   XLSX.utils.book_append_sheet(workbook, userPreferenceDistributionWorkSheet, "user-preference-anlytics");
//   XLSX.utils.book_append_sheet(workbook, userIssuesDistributionWorkSheet, "user-issues-anlytics");
//   XLSX.utils.book_append_sheet(workbook, ReviewsWorkSheet, "reviews");

//   // download to client browser
//   XLSX.writeFile(workbook, `zariyaaAnalytics ${startDate}-${endDate}.xlsx`);
// }
export default AdminNavbarComp;


function getPreviousMonthStart(currentDate) {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  return new Date(year, month - 2, 1);
}

function getMonthEnd(currentDate) {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  return new Date(year, month - 1, 0);
}

function getPreviousWeekEnd(currentDate) {

  let dayOFWeek = currentDate.getDay();
  // 0 is sunday that why 1 is added
  return new Date(currentDate.getTime() - (dayOFWeek + 1) * 24 * 60 * 60 * 1000)
}

function getPreviousWeekStart(currentDate) {

  let dayOFWeek = currentDate.getDay();

  // 0 is sunday that why 7 is added
  return new Date(currentDate.getTime() - (dayOFWeek + 7) * 24 * 60 * 60 * 1000)
}


function getLastYearStart(currentDate) {

  let currentYear = currentDate.getFullYear()
  return new Date(currentYear - 1, 11, 31);


}

function getlastYearEnd(currentDate) {

  let currentYear = currentDate.getFullYear()
  return new Date(currentYear - 1, 0, 1);

}


const GetReportAPICALL = async () => {



}