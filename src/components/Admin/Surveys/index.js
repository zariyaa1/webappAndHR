import React, { useEffect, useState } from "react";
import styles from "./index.module.css";

import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import camera from "../../../assets/icons/camera.svg";
import mic from "../../../assets/icons/mic.svg";
import ball from "../../../assets/icons/ball.svg";
import code from "../../../assets/icons/html.svg";
import video from "../../../assets/icons/video.svg";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { getCategoryById } from "../../../services/categories";
import { getDashboardData } from "../../../services/admin";
import {
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
  ResponsiveContainer,
  Rectangle,
  Cell,
} from "recharts";

const btn_grp = [
  {
    name: " Content",
  },
  {
    name: " Dailies",
    id: "62d93aafe4cb5b48c431e44c",
  },
  {
    name: " Courses",
    id: "62e210034c17eb298fa6e1dc",
  },
  {
    name: " Healing Tools",
    id: "62e20ff24c17eb298fa6e1d9",
  },
];

const data = [
  {
    name: "Daily Meditation",
    img: video,
    views: "1.2k Views",
  },
  {
    name: "Daily Meditation",
    img: code,
    views: "1.2k Views",
  },
  {
    name: "Daily Meditation",
    img: ball,
    views: "1.2k Views",
  },
  {
    name: "Daily Meditation",
    img: camera,
    views: "1.2k Views",
  },
  {
    name: "Daily Meditation",
    img: mic,
    views: "1.2k Views",
  },
  {
    name: "Daily Meditation",
    img: mic,
    views: "1.2k Views",
  },
  {
    name: "Daily Meditation",
    img: mic,
    views: "1.2k Views",
  },
  {
    name: "Daily Meditation",
    img: video,
    views: "1.2k Views",
  },
  {
    name: "Daily Meditation",
    img: code,
    views: "1.2k Views",
  },
  {
    name: "Daily Meditation",
    img: ball,
    views: "1.2k Views",
  },
  {
    name: "Daily Meditation",
    img: camera,
    views: "1.2k Views",
  },
  {
    name: "Daily Meditation",
    img: mic,
    views: "1.2k Views",
  },
];

const AdminSurveyComp = ({ state }) => {
  const [value, setValue] = React.useState("1");
  const [value2, setValue2] = React.useState("a");
  const [tabdata1, setTabdata1] = useState("");
  const [tabdata2, setTabdata2] = useState("");
  const [tabdata3, setTabdata3] = useState("");
  const [accdata, setAccdata] = useState("");
  const [categoryCounts, setCategoryCounts] = useState();
  const [categoryCounts2, setCategoryCounts2] = useState();
  const [categoryCounts3, setCategoryCounts3] = useState();
  const [graphData, setGraphData] = useState();
  const [classname, setClassname] = useState(new Array(4).fill(""));


  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChange2 = (event, newValue) => {
    setValue2(newValue);
  };


  /***
   * tabdata1 is for dailies in top5 content based on mins component
   */
  useEffect(() => {

    // TODO : need to make date dynamic
    let v = {
      query: "number_of_contents_watched",
      year: "2024",
    };


    getDashboardData(v)
      .then((res) => {
        setGraphData(modifyData(res?.data?.monthwiseData));
      })
      .catch((err) => {
        console.log(err);
      });
    getCategoryById("62d93aafe4cb5b48c431e44c")
      .then((res) => {
        setTabdata1(res?.data?.data);
        res?.data?.data.forEach((category) => {
          setCategoryCounts([]);
          let val = {
            query: "number_of_contents_watched",
            viewCountOnly: true,
            categoryId: category?._id,
          };

          getDashboardData(val)
            .then((count) => {
              setCategoryCounts((prevCounts) => {
                // Ensure prevCounts is initialized as an empty array if undefined
                const counts = Array.isArray(prevCounts) ? prevCounts : [];
                return [...counts, { _id: val.categoryId, count: count?.data?.count }];
              });
            })
            .catch((error) => {
              console.error("Error fetching category count:", error);
            });
        });
      })
      .catch((err) => {
        console.log(err);
      });
    getCategoryById("62e210034c17eb298fa6e1dc")
      .then((res) => {
        setTabdata2(res?.data?.data);
        res?.data?.data.forEach((category) => {
          setCategoryCounts2([]);
          let val = {
            query: "number_of_contents_watched",
            viewCountOnly: true,
            categoryId: category?._id,
          };

          getDashboardData(val)
            .then((count) => {
              setCategoryCounts2((prevCounts) => {
                // Ensure prevCounts is initialized as an empty array if undefined
                const counts = Array.isArray(prevCounts) ? prevCounts : [];
                return [...counts, { _id: val.categoryId, count: count?.data?.count }];
              });
            })
            .catch((error) => {
              console.error("Error fetching category count:", error);
            });
        });
      })
      .catch((err) => {
        console.log(err);
      });
    getCategoryById("62e20ff24c17eb298fa6e1d9")
      .then((res) => {
        setTabdata3(res?.data?.data);
        res?.data?.data.forEach((category) => {
          setCategoryCounts3([]);
          let val = {
            query: "number_of_contents_watched",
            viewCountOnly: true,
            categoryId: category?._id,
          };

          getDashboardData(val)
            .then((count) => {
              setCategoryCounts3((prevCounts) => {
                // Ensure prevCounts is initialized as an empty array if undefined

                const counts = Array.isArray(prevCounts) ? prevCounts : [];
                return [...counts, { _id: val.categoryId, count: count?.data?.count }];
              });
            })
            .catch((error) => {
              console.error("Error fetching category count:", error);
            });
        });
      })
      .catch((err) => {
        console.log(err);
      });
    const newArr = [...classname];
    newArr[0] = true;
    setClassname(newArr);
  }, []);

  const modifyData = (apiData) => {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const modifiedData = months.map((month) => ({
      month: month,
      count: 0,
    }));

    apiData.forEach((apiItem) => {
      const index = parseInt(apiItem._id) - 1;
      if (modifiedData[index]) {
        modifiedData[index].count = apiItem.total;
      }
    });
    return modifiedData;
  };

  const handleaccordionClick1 = (e) => {
    const data = {
      query: "top_n_content",
      categoryId: e,
    };
    getDashboardData(data)
      .then((res) => {
        setAccdata(res?.data?.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDivChange = (id, index) => {
    const newArr = new Array(4).fill("");
    newArr[index] = true;
    setClassname(newArr);
    if (!id) {
      let v = {
        query: "number_of_contents_watched",
        year: "2024",
      };
      getDashboardData(v)
        .then((res) => {
          setGraphData(modifyData(res?.data?.monthwiseData));
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      let v = {
        query: "number_of_contents_watched",
        year: "2024",
        masterCategoryId: id,
      };
      getDashboardData(v)
        .then((res) => {
          setGraphData(modifyData(res?.data?.monthwiseData));
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.secondaryContainer}>
        <TotalContentWatchedComponent
          classname={classname}
          graphData={graphData}
          handleDivChange={handleDivChange}
        />

        <TopFiveContentBasedOnMinutes
          value={value}
          handleChange={handleChange}
          tabdata1={tabdata1}
          handleaccordionClick1={handleaccordionClick1}
          accdata={accdata}
          tabdata2={tabdata2}
          tabdata3={tabdata3}

        />

        <TopFiveContentBasedOnView
          value2={value2}
          handleChange2={handleChange2}
          tabdata1={tabdata1}
          tabdata2={tabdata2}
          categoryCounts={categoryCounts}
          categoryCounts3={categoryCounts3}
          categoryCounts2={categoryCounts2}
          tabdata3={tabdata3}
        />
      </div>
    </div>
  );
};

export default AdminSurveyComp;



const TopFiveContentBasedOnMinutes = ({ value,
  handleChange,
  tabdata1,
  handleaccordionClick1,
  accdata,
  tabdata2,
  tabdata3 }
) => {


  return (<>

    <div className={styles.miniContainer}>
      <div className={styles.CardContainer}>
        <div className={styles.headingContainer}>
          <span className={styles.heading}>Top 5 Content</span>
          <span className={styles.description}>
            Based on Number of Minutes Watched
          </span>
        </div>
      </div>
      <div className={styles.contentContainer}>
        <div className={styles.tabContainer}>
          <TabContext value={value} variant="fullwidth">


            {/* value is for course 1 , dailies 2, healing tools 3 */}
            <div className={styles.tabholder}>
              <TabList
                variant="fullwidth"
                onChange={handleChange}
                aria-label="lab API tabs example"
                centered
              >
                <Tab label="Dailies" value="1" sx={{ width: "33.33%" }} />
                <Tab label="Courses" value="2" sx={{ width: "33.33%" }} />
                <Tab label="Healing" value="3" sx={{ width: "33.33%" }} />
              </TabList>
            </div>
            {tabdata1 && (

              <TabPanel value="1">
                {tabdata1.map((data, index) => (
                  <ModifiedAccordian data={data} handleaccordionClick1={handleaccordionClick1} accdata={accdata} />
                ))}
              </TabPanel>
            )}{" "}
            {tabdata2 && (
              <TabPanel value="2">
                {tabdata2.map((data, index) => (
                  <ModifiedAccordian data={data} handleaccordionClick1={handleaccordionClick1} accdata={accdata} />
                ))}
              </TabPanel>
            )}{" "}
            {tabdata3 && (
              <TabPanel value="3">
                {tabdata3.map((data, index) => (
                  <ModifiedAccordian data={data} handleaccordionClick1={handleaccordionClick1} accdata={accdata} />
                ))}
              </TabPanel>
            )}
          </TabContext>
        </div>
      </div>
    </div>{" "}
  </>)
}


const TopFiveContentBasedOnView = ({
  value2,
  handleChange2,
  tabdata1,
  tabdata2,
  categoryCounts,
  categoryCounts3,
  categoryCounts2,
  tabdata3
}
) => {


  return (<>

    <div className={styles.miniContainer}>
      <div className={styles.CardContainer}>
        <div className={styles.headingContainer}>
          <span className={styles.heading}>Top 5 Content</span>
          <span className={styles.description}>
            Based on Number of  view
          </span>
        </div>
      </div>
      <div className={styles.contentContainer}>
        <div className={styles.tabContainer}>
          <TabContext value={value2} variant="fullwidth">
            <div className={styles.tabholder}>
              <TabList
                variant="fullwidth"
                onChange={handleChange2}
                centered
              >
                <Tab label="Dailies" value="a" sx={{ width: "33.33%" }} />
                <Tab label="Courses" value="b" sx={{ width: "33.33%" }} />
                <Tab label="Healing" value="c" sx={{ width: "33.33%" }} />
              </TabList>
            </div>
            <TabPanel value="a">
              <div className={styles.Tcontainer}>
                {tabdata1 &&
                  tabdata1.map((item, index) => (
                    <div className={styles.Tcontent}>
                      <img src={data?.[index]?.img} />
                      <span className={styles.acctext}>{item.name}</span>
                      <span className={styles.accvalue}>
                        {categoryCounts.filter((objectWithViewsAndCategoryId) => { return objectWithViewsAndCategoryId._id === item._id })[0]?.count || 0} views
                      </span>
                    </div>
                  ))}
              </div>
            </TabPanel>
            <TabPanel value="b">
              <div className={styles.Tcontainer}>
                {tabdata2 &&
                  tabdata2.map((item, index) => (
                    <div className={styles.Tcontent}>
                      <img src={data?.[index]?.img} />
                      <span className={styles.acctext}>{item.name}</span>
                      <span className={styles.accvalue}>
                        {categoryCounts2.filter((objectWithViewsAndCategoryId) => { return objectWithViewsAndCategoryId._id === item._id })[0]?.count || 0} views
                      </span>
                    </div>
                  ))}
              </div>
            </TabPanel>
            <TabPanel value="c">
              <div className={styles.Tcontainer}>
                {tabdata3 &&
                  tabdata3.map((item, index) => (
                    <div className={styles.Tcontent}>
                      {/* {categoryCounts3.filter((viewWithCategoryId) => viewWithCategoryId._id === item._id)} */}
                      {console.log('doc',)}
                      <img src={data?.[index]?.img} />
                      <span className={styles.acctext}>{item.name}</span>
                      <span className={styles.accvalue}>
                        {categoryCounts3.filter((objectWithViewsAndCategoryId) => { return objectWithViewsAndCategoryId._id === item._id })[0]?.count || 0} views
                      </span>
                    </div>
                  ))}
              </div>{" "}
            </TabPanel>
          </TabContext>
        </div>
      </div>
    </div>{" "}
  </>)
}
const TotalContentWatchedComponent = ({
  classname,
  graphData,
  handleDivChange
}) => {

  return (<>

    <div className={styles.miniContainer}>
      <div className={styles.CardContainer}>
        <div className={styles.headingContainer}>
          <span className={styles.heading}>Total Content Watched</span>
          <span className={styles.description}>
            Content Watched Overview
          </span>
        </div>

      </div>
      <div className={styles.contentContainer}>
        <div className={styles.buttonGroup}>
          {btn_grp.map((item, index) => (
            <div
              className={
                !classname[index]
                  ? styles.indbutton
                  : styles.indbutton_active
              }
              key={index}
              onClick={(e) => handleDivChange(item.id, index)}
            >
              Total <span className={styles.btnhelper}>{item.name} </span>{" "}
              watched
            </div>
          ))}
        </div>
        <div className={styles.graphContainer}>
          <BarChart data={graphData} width={500} height={350}>
            <CartesianGrid stroke="#f5f5f5" />
            <YAxis type="number" dataKey="count" />
            <XAxis dataKey="month" type="category" />
            <Tooltip />
            <Bar
              dataKey="count"
              fill="#00a0fc"
              stroke="#000000"
              strokeWidth={1}
            >
              {graphData?.map((entry, index) => (
                <Cell key={`cell-${index}`} strokeWidth={0} />
              ))}
            </Bar>
          </BarChart>
        </div>
      </div>
    </div>{" "}
  </>)
}



const ModifiedAccordian = ({ data }) => {

  const [accdata, setAccdata] = useState("");

  const handleaccordionClick1 = async (e) => {
    const data = {
      query: "top_n_content",
      categoryId: e,
    };

    try {

      let res = await getDashboardData(data)
      setAccdata(res?.data?.data);
    } catch (err) {
      console.log('something went wrong while fetching minutes viewed ')
    }

  };


  return (<>

    <Accordion
      onChange={() => handleaccordionClick1(data._id)}
    >
      <AccordionSummary
        expandIcon={<ArrowDropDownIcon />}
        aria-controls="panel2-content"
        id="panel2-header"
      >
        <Typography> {data.name}</Typography>
      </AccordionSummary>
      {accdata ? accdata.length > 0 ? accdata.map((item, index) => (
        <AccordionDetails>
          <div className={styles.accdetails}>
            <span className={styles.acctext}>
              {item?.content?.title}
            </span>
            <span className={styles.accvalue}>
              {item?.minsWatched} minutes
            </span>
          </div>
        </AccordionDetails>
      )) : <AccordionDetails>  no content watched</AccordionDetails> : <AccordionDetails>  loading</AccordionDetails>
      }
    </Accordion>
  </>)
}