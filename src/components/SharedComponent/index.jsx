import React from "react";
import styles from "./index.module.css";
import ComplexGrid from "../../utilities/DailiesCard";

const SharedComponent = ({ headerData, cardData, onClick }) => {
  return (
    <>
      <div className={styles.mainContainer}>
        <div className={styles.header}>
          <div className={styles.heading}>{headerData?.name}</div>
          <div className={styles.subHeading}>
            {headerData?.description && (
              <>
                <span className={styles.spanText}>
                  {headerData?.description.split(" ").slice(0, 2).join(" ")}
                </span>{" "}
                {headerData?.description.split(" ").slice(2).join(" ")}
              </>
            )}
          </div>
        </div>
        <div className={styles.cardContainer}>
          {cardData?.map((card) => (
            <ComplexGrid
              onClick={() => onClick(card._id)}
              key={card._id}
              imgURL={card.mediaLink}
              mainText={card.name}
              subText={card.description}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default SharedComponent;
