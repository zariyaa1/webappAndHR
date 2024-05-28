import styles from "./index.module.css";
import ComplexGrid from "../../utilities/DailiesCard";
import LocalStorageService from "../../utilities/LocalStorageService";
import pCard1 from "../../assets/images/confused 1.svg";
import pCard2 from "../../assets/images/pcard2.svg";
import pCard3 from "../../assets/images/pcard3.svg";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { AccountCircleRounded } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import {
  fetchChallenge,
  fetchExpert,
  fetchFeedData,
  fetchMood,
  fetchResources,
  fetchSleep,
  fetchUserData,
  postMoodData,
  postSleepData,
} from "../../services/homeData";
import HomeCard from "../../utilities/HomeCard";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../../utilities/Loader";
import ResourceCard from "../../utilities/ResourceCard";
import ExpertCard from "../../utilities/ExpertCard";
import toast, { Toaster } from "react-hot-toast";
import VideoModal from "../../utilities/VideoModal";
import { fetchCompletedAppointment } from "../../services/appointment";
import plant from "../../assets/icons/plant.svg";
const HomeComponent = () => {
  const [check, setCheck] = useState(false);
  const [loading, setLoading] = useState(true);
  const [expertDetails, setExpertDetails] = useState();
  const [contentId, setContentId] = useState("");
  const [playlistId, setPlaylistId] = useState("");
  const [userDetails, setUserDetails] = useState();
  const [show, setShow] = useState(true);
  const [feedData, setFeedData] = useState();
  const [challenge, setChallenge] = useState();
  const [expert, setExpert] = useState();
  const [resourceData, setResourceData] = useState();
  const [mood, setMood] = useState();
  const [sleep, setSleep] = useState();
  const dailiesData = feedData?.dailies;
  const coursesData = feedData?.courses;
  const healingData = feedData?.healingTools;
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const openMenu = Boolean(anchorEl);
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
  const handleAppointmentClick = () => {
    navigate(`/appointment`);
  };
  const handleAppointmentClick3 = () => {
    navigate(
      `/appointment/${expertDetails?.expertId?._id}/${expertDetails?.expertId?.type}`
    );
  };

  const handleAppointmentClick2 = () => {
    navigate(`/Myappointment`);
  };
  const id = LocalStorageService.getID();
  const handleClickMood = (card) => {
    postMoodData(id, card?._id)
      .then((res) => {
        if (res.status === 201) {
          toast.success("Mood updated Successfully", {
            duration: 1000,
          });
          return;
        } else {
          toast.error("Something Went Wrong", {
            duration: 1000,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleClickSleep = (card) => {
    postSleepData(id, card?._id)
      .then((res) => {
        if (res.status === 201) {
          toast.success("Sleep Mood updated Successfully", {
            duration: 1000,
          });
          return;
        } else {
          toast.error("Something Went Wrong", {
            duration: 1000,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [openModal, setOpenModal] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");
  const [plantcount, setPlantcount] = useState(0);

  const handleOpenModal = (videoUrl, id, Pid) => {
    setVideoUrl(videoUrl);
    setOpenModal(true);
    setContentId(id);
    setPlaylistId(Pid);
  };
  const handleCloseModal = () => {
    setVideoUrl("");
    setOpenModal(false);

    fetchFeedData(id)
      .then((res) => {
        if (res.status === 200) {
          setPlantcount(res?.data?.plants);
        }
      })
      .catch((err2) => {
        toast.error("Please try again later", { duration: 2000 });
      });
  };

  useEffect(() => {
    if (id) {
      fetchCompletedAppointment(id)
        .then((res) => {
          setShow(true);
          setExpertDetails(res?.data?.data?.[0]);
        })
        .catch((err) => {
          setShow(false);
        });

      fetchFeedData(id)
        .then((res) => {
          if (res.status === 200) {
            setFeedData(res?.data);
            setPlantcount(res?.data?.plants);
          }
        })
        .catch((err2) => {
          toast.error("Please try again later", { duration: 2000 });
        })
        .finally(() => setLoading(false));
      fetchUserData(id)
        .then((res) => {
          if (res.status === 200) {
            setUserDetails(res?.data);
            if (
              res?.data?.roles?.[0]?.name === "corporateAdmin" ||
              res?.data?.roles?.[1]?.name === "corporateAdmin"
            ) {
              setCheck(true);
            }
          }
        })
        .catch((err2) => {
          toast.error("Please try again later", { duration: 2000 });
        });
    } else {
      toast.error("Please try again later", { duration: 2000 });
    }
  }, [id]);
  useEffect(() => {
    fetchChallenge()
      .then((res) => {
        if (res.status === 200) {
          setChallenge(res?.data?.data);
        }
      })
      .catch((err2) => {
        toast.error("Please try again later", { duration: 2000 });
      })
      .finally(() => setLoading(false));

    fetchExpert()
      .then((res) => {
        if (res.status === 200) {
          setExpert(res?.data?.data);
        }
      })
      .catch((err2) => {
        toast.error("Please try again later", { duration: 2000 });
      })
      .finally(() => setLoading(false));

    fetchMood()
      .then((res) => {
        if (res.status === 200) {
          setMood(res?.data?.data);
        }
      })
      .catch((err2) => {
        toast.error("Please try again later", { duration: 2000 });
      })
      .finally(() => setLoading(false));
    fetchSleep()
      .then((res) => {
        if (res.status === 200) {
          setSleep(res?.data?.data);
        }
      })
      .catch((err2) => {
        toast.error("Please try again later", { duration: 2000 });
      })
      .finally(() => setLoading(false));
    fetchResources()
      .then((res) => {
        if (res.status === 200) {
          setResourceData(res?.data);
        }
      })
      .catch((err2) => {
        toast.error("Please try again later", { duration: 2000 });
      })
      .finally(() => setLoading(false));
  }, []);
  const handleDailiesClick = () => {
    navigate(`/dailies`);
  };
  const closeLoader = () => {
    setLoading(false);
  };
  const handleCourseClick = (card) => {
    navigate(`/courses/content/${card?.categoryId}/${card?._id}`);
  };
  const handleHealingClick = (card) => {
    navigate(`/healingtools/${card?._id}`);
  };

  return (
    <div className={styles.container}>
      <div className={styles.mainContainer}>
        {loading && <Loader open={loading} handleClose={closeLoader} />}
        <div className={styles.header}>
          <div className={styles.heading}>
            Good Morning ! {userDetails?.name}
          </div>
          <div className={styles.ct}>
            <div className={styles.pltContainer}>
              <img src={plant} />
              <span>
                <span className={styles.helptext}> {plantcount} </span> Plants
              </span>
            </div>
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
                {check && (
                  <Link
                    to="/dashboard/admin"
                    style={{ color: "#000000", textDecoration: "none" }}
                  >
                    <MenuItem>Dashboard</MenuItem>
                  </Link>
                )}
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </div>
          </div>
        </div>
        <div className={styles.dailiesContainer}>
          <div className={styles.head}>
            <div>Dailies For You</div>
            <div
              style={{
                color: "#FFFFFF",
              }}
              className={styles.exploreBtn}
            >
              <span
                style={{ paddingRight: "10px", color: "#FD939F" }}
                onClick={(e) => navigate("/onboarding/questionnare/1")}
              >
                Change Plan
              </span>{" "}
              <span onClick={handleDailiesClick}>Explore All</span>
            </div>
          </div>
          <div
            className={styles.cardContainer}
            style={{
              paddingLeft: "0",
              justifyContent: "space-between",
            }}
          >
            {dailiesData?.map((card) => (
              <ComplexGrid
                onClick={() => {
                  handleOpenModal(
                    card?.contentId?.mediaLink,
                    card?.contentId?._id,
                    card?.playlistId?._id
                  );
                }}
                width={"23vw"}
                key={card?.contentId?._id}
                imgURL={card?.playlistId?.categoryId?.mediaLink}
                mainText={card?.contentId?.title}
                // subText={card?.contentId?.description}
                style={{
                  marginRight: "100px",
                }}
              />
            ))}
          </div>
        </div>
        {videoUrl && (
          <VideoModal
            open={openModal}
            onClose={handleCloseModal}
            videoUrl={videoUrl}
            contentId={contentId}
            playlistId={playlistId}
          />
        )}

        <div className={styles.coursesContainer}>
          <div className={styles.head}>
            <div>Courses For You</div>
            <div
              className={styles.exploreBtn}
              onClick={() => {
                navigate(`/courses`);
              }}
            >
              Explore All
            </div>
          </div>

          <div className={`${styles.cardContainer} ${styles.scrollContainer}`}>
            {coursesData?.map((card) => (
              <HomeCard
                key={card?._id}
                imgURL={card?.mediaLink2}
                mainText={card?.name}
                subText={card?.description}
                onClick={() => {
                  handleCourseClick(card);
                }}
              />
            ))}
          </div>
        </div>
        <div className={styles.healingContainer}>
          <div className={styles.head}>
            <div>Healing Tools</div>
            <div
              className={styles.exploreBtn}
              onClick={() => {
                navigate(`/healingtools`);
              }}
            >
              Explore All
            </div>
          </div>

          <div className={`${styles.cardContainer} ${styles.scrollContainer}`}>
            {healingData?.map((card) => (
              <HomeCard
                key={card?._id}
                imgURL={card?.mediaLink}
                mainText={card?.name}
                subText={card?.description}
                onClick={() => {
                  handleHealingClick(card);
                }}
              />
            ))}
          </div>
        </div>
        {/*  <div className={styles.challengesContainer}>
          <div className={styles.head}>
            <div>Challenges for you</div>
            <div
              className={styles.exploreBtn}
              onClick={() => {
                navigate(`/challenges`);
              }}
            >
              Explore All
            </div>
          </div>

          <div className={styles.cardContainer}>
            {challenge?.map((card) => (
              <MiniCard name={card.name} imgURL={card.mediaLink} />
            ))}
          </div>
        </div> */}
        <div className={styles.expertContainer}>
          <div className={styles.head}>
            <div>Consult an Expert </div>
          </div>

          <div
            style={{
              justifyContent: "flex-start",
            }}
            className={styles.cardContainer}
          >
            <ExpertCard
              onClick={handleAppointmentClick}
              header={"Need Any Advice ?"}
              description={"Consult an Expert"}
              btnText={"Book an Appointment"}
              btnBackColor={"#FBBECE"}
              btnColor={"#2F2564"}
              pCardUrl={pCard1}
            />
            <ExpertCard
              onClick={handleAppointmentClick2}
              header={"My Appointments"}
              description={"View & Edit appointment"}
              btnText={"View Appointments"}
              btnBackColor={"#2F2564"}
              btnColor={"#FFFFFF"}
              pCardUrl={pCard2}
            />
            {show && (
              <ExpertCard
                onClick={handleAppointmentClick3}
                header={"Consult Again with our Expert"}
                name={expertDetails?.expertId?.userId?.name}
                type={expertDetails?.expertId?.type}
                btnText={"Book an Appointment"}
                btnColor={"#2F2564"}
                btnBackColor={"#FBBECE"}
                pCardUrl={pCard3}
              />
            )}
          </div>
        </div>

        <div className={styles.expertContainer}>
          <div className={styles.head}>
            <div>Mood Meter </div>
            <div
              className={styles.exploreBtn}
              onClick={() => navigate(`/moods/insights`)}
            >
              Insights
            </div>
          </div>
          <div className={styles.moodMeter}>
            <div
              style={{
                textAlign: "center",
                paddingTop: "3%",
                fontSize: "20px",
                fontWeight: "600",
                color: "#FFFFFF",
              }}
            >
              Tell us how are you feeling now ?
            </div>

            <div
              style={{ justifyContent: "space-around", paddingTop: "20px" }}
              className={styles.cardContainer}
            >
              {mood?.map((card) => (
                <div className={styles.moodCardContainer}>
                  <img
                    style={{
                      marginLeft: "3%",
                      marginRight: "2%",
                      marginTop: "3%",
                    }}
                    onClick={() => handleClickMood(card)}
                    src={card.imageUrl}
                  />
                  <span>{card.name}</span>
                </div>
              ))}
            </div>
          </div>
          <div className={styles.head}>
            <div>Sleep Meter </div>
            <div
              className={styles.exploreBtn}
              onClick={() => navigate(`/moods/insights`)}
            >
              Insights
            </div>
          </div>
          <div className={styles.moodMeter}>
            <div
              style={{
                textAlign: "center",
                paddingTop: "3%",
                fontSize: "20px",
                fontWeight: "600",
                color: "#FFFFFF",
              }}
            >
              Tell us how are you feeling now ?
            </div>

            <div
              style={{
                justifyContent: "center",
                paddingTop: "20px",
                gap: "30px",
                textTransform: "capitalize",
              }}
              className={styles.cardContainer}
            >
              {sleep?.map((card) => (
                <div className={styles.moodCardContainer}>
                  <img
                    style={{
                      marginLeft: "3%",
                      marginRight: "2%",
                      marginTop: "3%",
                    }}
                    onClick={() => handleClickSleep(card)}
                    src={card.imageUrl}
                  />
                  <span>{card.name}</span>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.resourcesContainer}>
            <div
              style={{
                marginTop: "1%",
              }}
              className={styles.head}
            >
              <div>Resourse Center</div>
              <div
                className={styles.exploreBtn}
                onClick={() => {
                  navigate(`/blogs`);
                }}
              >
                Explore All
              </div>
            </div>
            <div
              className={styles.cardContainer}
              style={{
                paddingLeft: "0",
                justifyContent: "space-between",
              }}
            >
              {resourceData?.slice(0, 3).map((card) => (
                <ResourceCard
                  key={card._id}
                  imgUrl={card?.mediaLink}
                  title={card?.blogTitle}
                  onClick={() => {
                    navigate(`/blogs`);
                  }}
                />
              ))}
            </div>
          </div>

          {/*           <div className={styles.footerContainer}>
            <div
              style={{
                marginTop: "2%",
              }}
              className={styles.head}
            >
              <div>Meet our Experts</div>
            </div>

            <div
              className={styles.cardContainer}
              style={{
                paddingLeft: "0",
                marginTop: "1%",
              }}
            >
               {challenge?.map((card) => (
                <MiniCard imgURL={card.mediaLink} />
              ))} 
              <ExpertCard
                header={"Need Any Advice ?"}
                description={"Consult an Expert"}
                btnText={"Book an Appointment"}
              />
            </div>
          </div> */}

          {/* <div className={styles.cardContainer}>
            {mood?.map((card) => (
              <img src={card.imageUrl} />
            ))}
          </div> */}
        </div>

        <Toaster />
      </div>
    </div>
  );
};

export default HomeComponent;
