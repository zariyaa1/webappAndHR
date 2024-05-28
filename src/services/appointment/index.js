import axios from "../axios";

export const postAppointment = async (data) => {
  try {
    const url = `content-service/apis/consultation`;
    const response = await axios.post(url, data);
    return response;
  } catch (err) {
    throw err;
  }
};

export const postFollowAppointment = async (data, id) => {
  try {
    const url = `content-service/apis/consultation?expertId=${id}`;
    const response = await axios.post(url, data);
    return response;
  } catch (err) {
    throw err;
  }
};

export const fetchTableData = async (id) => {
  try {
    const url = `content-service/apis/consultation?userId=${id}&status=BOOKED`;
    const response = await axios.get(url);
    return response;
  } catch (err) {
    console.error("Error fetching  Data:", err);
    throw err;
  }
};
export const deleteAppointment = async (id, reason) => {
  try {
    const url = `content-service/apis/consultation/${id}?reason=${reason}`;
    const response = await axios.delete(url);
    return response;
  } catch (err) {
    console.error("Error deleting  appointment:", err);
    throw err;
  }
};
export const fetchCompletedAppointment = async (id) => {
  try {
    const url = `content-service/apis/consultation?userId=${id}&status=COMPLETED`;
    const response = await axios.get(url);
    return response;
  } catch (err) {
    console.error("Error fetching  Data:", err);
    throw err;
  }
};
export const fetchCancelledAppointment = async (id) => {
  try {
    const url = `content-service/apis/consultation?userId=${id}&status=CANCELLED`;
    const response = await axios.get(url);
    return response;
  } catch (err) {
    console.error("Error fetching  Data:", err);
    throw err;
  }
};
