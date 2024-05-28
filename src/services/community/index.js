import axios from "../axios";

export const fetchCommunity = async () => {
  try {
    const url = `content-service/apis/thread`;
    const response = await axios.get(url);
    return response;
  } catch (err) {
    throw err;
  }
};

export const postCommunityData = async (data) => {
  try {
    // const id = LocalStorageService.getID();
    const url = `content-service/apis/thread`;
    const response = await axios.post(url, data);
    return response;
  } catch (err) {
    throw err;
  }
};
