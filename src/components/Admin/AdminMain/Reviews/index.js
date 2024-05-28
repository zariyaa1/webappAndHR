import React, { useEffect, useState } from "react";
import styles from "./index.module.css";
import talk from "../../../../assets/images/talking.svg";
import { getDashboardData } from "../../../../services/admin";
import "react-multi-carousel/lib/styles.css";
import Carousel from "react-multi-carousel";
import "./review.css";

const ReviewComp = ({
  Reviews,
  setReviews,
  dated,
  state }) => {


  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 3, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };
  useEffect(() => {
    getDashboardData({ query: "reviews", fromDate: state[0].endDate, toDate: state[0].startDate })
      .then((res) => {
        setReviews(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [state]);


  return (
    <div className={styles.mainContainer}>
      {Reviews && (
        <div className={styles.secondaryContainer}>
          <span>Reviews for your Review</span>
          {Reviews && (
            <Carousel
              swipeable={true}
              draggable={true}
              showDots={true}
              responsive={responsive}
              ssr={true} // means to render carousel on server-side.
              infinite={false}
              autoPlay={true}
              // autoPlaySpeed={1000}
              keyBoardControl={true}
              // customTransition="all 2000"
              // transitionDuration={2000}
              containerClass="carousel-container"
              removeArrowOnDeviceType={["tablet", "mobile", "desktop"]}
              // deviceType={this.props.deviceType}
              dotListClass="custom-dot-list-style"
            >
              {Reviews?.map((item) => (
                <div className={styles.reviewContainer}>
                  <img src={talk} />
                  <span className={styles.review}>{item.review}</span>
                </div>
              ))}
            </Carousel>
          )}
        </div>
      )}
    </div>
  );
};

export default ReviewComp;
