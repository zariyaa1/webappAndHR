import LocalStorageService from "../../utilities/LocalStorageService";
import axios from "../axios";

export const login = async (obj) => {
  try {
    const url = `user-management/apis/user/${obj}/otp`;
    const response = await axios.post(url, { signup: "true" });
    return response.data;
  } catch (err) {
    return err;
  }
};

export const otp = async (obj) => {
  try {
    const id = LocalStorageService.getID();
    const url = `user-management/apis/user/${id}/login`;
    const response = await axios.post(url, { otp: obj });
    return response;
  } catch (err) {
    throw err;
  }
};
export const token = async (at, rt) => {
  try {
    const id = LocalStorageService.getID();
    const url = `user-management/apis/user/${id}/token`;
    const response = await axios.post(url, {
      accessToken: at,
      refreshToken: rt,
    });
    return response.data;
  } catch (err) {
    return err;
  }
};
