import axios from "axios";

const Endpoint = `https://dev-api.zariyaaexpert.in/content-service/apis`;

export const getToken = () =>
  localStorage.getItem("accessToken")
    ? localStorage.getItem("accessToken")
    : null;
export const getAuthorizationHeader = () => `Bearer ${getToken()}`;
export const axiosInstance = axios.create({
  baseURL: `https://dev-api.zariyaaexpert.in/user-management/apis/user`,
  headers: { Authorization: getAuthorizationHeader() },
});
export const AuthService = axios.create({
  baseURL: `https://dev-api.zariyaaexpert.in/user-management/apis/user`,
  timeout: 10 * 1000,
  headers: {
    "Content-Type": "application/json",
  },
});
export const Category = axios.create({
  baseURL: `${Endpoint}`,
  timeout: 10 * 1000,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
  },
});
export const PostData = axios.create({
  baseURL: `https://dev-api.zariyaaexpert.in/user-management/apis/user`,
  timeout: 10 * 1000,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
  },
});
export const GetData = axios.create({
  baseURL: `${Endpoint}/user`,
  timeout: 10 * 1000,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
  },
});
