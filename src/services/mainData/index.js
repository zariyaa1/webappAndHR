import axios from "../../services/axios";

export const fetchMainData = async (id) => {
  try {
    const url = `content-service/apis/category?parentCategoryId=${id}`;
    const response = await axios.get(url);
    return response;
  } catch (err) {
    console.error("Error fetching category:", err);
    throw err;
  }
};

export const getPlaylistId = async (id) => {
  try {
  } catch (err) {
    console.error("Error fetching category:", err);
    throw err;
  }
};
export const getPlaylistData = async (id) => {
  try {
    const url = `content-service/apis/playlistcontent?playlistId=${id}`;
    const response = await axios.get(url);
    return response;
  } catch (err) {
    console.error("Error fetching playlist:", err);
    throw err;
  }
};
