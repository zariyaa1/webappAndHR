import axios from "../axios";

export const getDashboardData = async (data) => {
  try {
    const url = `content-service/apis/analytics`;
    const response = await axios.post(url, data);
    return response;
  } catch (err) {
    return err;
  }
};
