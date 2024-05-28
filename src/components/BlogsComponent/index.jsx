import React, { useEffect, useState } from "react";
import styles from "./index.module.css";
import { fetchResources } from "../../services/homeData";
import ResourceCard from "../../utilities/ResourceCard";

const BlogsComponent = () => {
  const [resourceData, setResourceData] = useState();
  const [blogOpen, setBlogOpen] = useState(false);
  const [blogDetails, setBlogDetails] = useState();

  useEffect(() => {
    fetchResources()
      .then((res) => {
        if (res.status === 200) {
          setResourceData(res?.data);
        }
      })
      .catch((err2) => {
        console.log(err2);
      });
  }, []);
  const handleCardClick = (blog) => {
    setBlogOpen(true);
    setBlogDetails(blog);
  };

  return (
    <div className={styles.container}>
      <div className={styles.mainContainer}>
        <div className={styles.heading}>Blogs</div>
        {!blogOpen && (
          <div className={styles.cardContainer}>
            {resourceData?.map((card) => (
              <ResourceCard
                imgUrl={card?.mediaLink}
                title={card?.blogTitle}
                onClick={() => handleCardClick(card)}
              />
            ))}
          </div>
        )}
        {blogOpen && blogDetails && (
          <div className={styles.detailContainer}>
            <div className={styles.detailHeader}>{blogDetails?.blogTitle}</div>
            <div className={styles.detailImage}>
              <img
                style={{
                  width: "75vw",
                  borderRadius: "10px",
                }}
                src={blogDetails?.mediaLink}
                alt="test-image"
              />
            </div>
            <div
              className={styles.description}
              dangerouslySetInnerHTML={{ __html: blogDetails?.description }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogsComponent;
