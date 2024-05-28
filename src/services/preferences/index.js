import LocalStorageService from "../../utilities/LocalStorageService";
import axios from "../axios";

export const checkPreferences = async () => {
  try {
    const id = LocalStorageService.getID();
    const url = `content-service/apis/user/${id}/preference/`;
    const response = await axios.get(url);
    return response;
  } catch (err) {
    throw err;
  }
};
export const updateDetails = async (name, dob, gender) => {
  try {
    const id = LocalStorageService.getID();
    const url = `user-management/apis/user/${id}`;
    const response = await axios.patch(url, {
      name: name,
      dob: dob,
      gender: gender,
    });
    return response;
  } catch (err) {
    throw err;
  }
};
export const getQuestions = async () => {
  try {
    const url = `content-service/apis/question?includeAnswers=true`;
    const response = await axios.get(url);
    return response;
  } catch (err) {
    throw err;
  }
};
export const submitQuestions = async (data) => {
  try {
    const id = LocalStorageService.getID();
    const url = `content-service/apis/user/${id}/preference/`;
    const response = await axios.post(url, {
      plans: data,
    });
    return response;
  } catch (err) {
    throw err;
  }
};
