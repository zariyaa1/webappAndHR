import axios from "../axios";

export const sendFeedback = async (data) => {
  try {
    const url = `content-service/apis/feedback`;
    const response = await axios.post(url, data);
    return response;
  } catch (err) {
    throw err;
  }
};
