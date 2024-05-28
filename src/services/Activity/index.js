import LocalStorageService from "../../utilities/LocalStorageService";
import axios from "../axios";
export const increasePlant = async (data) => {
  try {
    const id = LocalStorageService.getID();
    const url = `content-service/apis/user/${id}/activity`;
    const response = await axios.post(url, data);
    return response;
  } catch (err) {
    throw err;
  }
};

export const getActivity = async (id) => {
  try {
    const url = `content-service/apis/thread/${id}/activity`;
    const response = await axios.get(url);
    return response;
  } catch (err) {
    throw err;
  }
};

export const postActivity = async (id, body) => {
  try {
    const url = `content-service/apis/thread/${id}/activity`;
    const response = await axios.post(url, body);
    return response;
  } catch (err) {
    throw err;
  }
};

export const getThreadyById = async () => {
  try {
    const id = LocalStorageService.getID();
    const url = `content-service/apis/thread?userId=${id}`;
    const response = await axios.get(url);
    return response;
  } catch (err) {
    throw err;
  }
};
