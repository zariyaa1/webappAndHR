import axios from "../axios";

export const getExpert = async (data) => {
  try {
    const url = `content-service/apis/expert/${data}`;
    const response = await axios.get(url);
    return response;
  } catch (err) {
    throw err;
  }
};
