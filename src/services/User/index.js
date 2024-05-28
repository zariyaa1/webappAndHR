import LocalStorageService from "../../utilities/LocalStorageService";
import axios from "../axios";

export const getUser = async () => {
  try {
    const id = LocalStorageService.getID();
    const url = `user-management/apis/user/${id}`;
    const response = await axios.get(url);
    return response;
  } catch (err) {
    throw err;
  }
};

export const getUserById = async (id) => {
  try {
    const url = `user-management/apis/user/${id}`;
    const response = await axios.get(url);
    return response;
  } catch (err) {
    throw err;
  }
};

export const getUserPref = async () => {
  try {
    const id = LocalStorageService.getID();
    const url = `content-service/apis/user/${id}/preference/`;
    const response = await axios.get(url);
    return response;
  } catch (err) {
    throw err;
  }
};

export const updateUserPref = async (body) => {
  try {
    const id = LocalStorageService.getID();
    const url = `content-service/apis/user/${id}/preference/`;
    const response = await axios.put(url, { plans: body });
    return response;
  } catch (err) {
    throw err;
  }
};
