import axios from "../axios";

export const getCategoryById = async (id) => {
  try {
    const url = `content-service/apis/category?parentCategoryId=${id}`;
    const response = await axios.get(url);
    return response;
  } catch (err) {
    throw err;
  }
};
