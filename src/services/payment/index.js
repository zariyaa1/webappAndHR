import LocalStorageService from "../../utilities/LocalStorageService";
import axios from "../axios";

export const createPayment = async (data) => {
  try {
    const url = `content-service/apis/payment`;
    const response = await axios.post(url, data);
    return response;
  } catch (err) {
    throw err;
  }
};
export const verifyPayment = async (data) => {
  try {
    const url = `content-service/apis/payment/${data}/verify`;
    const response = await axios.post(url);
    return response;
  } catch (err) {
    throw err;
  }
};
