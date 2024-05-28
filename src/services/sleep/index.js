import LocalStorageService from "../../utilities/LocalStorageService";
import axios from "../axios";

export const sleepScore = async () => {
  try {
    const id = LocalStorageService.getID();
    const url = `content-service/apis/user/${id}/sleepscore`;
    const response = await axios.get(url);
    return response;
  } catch (err) {
    throw err;
  }
};
