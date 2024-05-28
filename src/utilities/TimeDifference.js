import React, { useState, useEffect } from "react";
import moment from "moment";

function TimeDifferenceCalculator(postTime) {
  const [timeDifference, setTimeDifference] = useState(null);

  useEffect(() => {
    if (postTime) {
      const calculateTimeDifference = () => {
        const currentUtcTime = new Date();
        const apiTimeDate = new Date(moment(postTime).toISOString());
        const differenceInMillis = currentUtcTime - apiTimeDate;
        const timeDifference = new Date(differenceInMillis);
        setTimeDifference(timeDifference);
      };

      calculateTimeDifference();

      // Update time difference every second
      const interval = setInterval(calculateTimeDifference, 60000);

      return () => clearInterval(interval);
    }
  }, [postTime]);

  return (
    <div>
      {timeDifference &&
        (timeDifference.getUTCDate() - 1 > 0
          ? `${timeDifference.getUTCDate() - 1} days ago`
          : timeDifference.getUTCHours() > 0
          ? `${timeDifference.getUTCHours()} hours ago`
          : `${Math.floor(timeDifference.getUTCMinutes())} minutes ago`)}
    </div>
  );
}

export default TimeDifferenceCalculator;
