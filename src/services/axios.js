import axios from "axios";
import LocalStorageService from "../utilities/LocalStorageService";

const instance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
});
instance.interceptors.request.use(
  (config) => {
    config.headers["Content-Type"] = "application/json";
    // if (config.url.includes("refresh-tokens")) {
    //   return config;
    // }

    const token = LocalStorageService.getAccessToken();
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  async function (error) {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error?.config;
    if (
      error?.response?.status === 401 &&
      error?.config?.url !== "/login" &&
      error?.config?.url !== "/otp"
    ) {
      try {
        const id = LocalStorageService.getID();
        const response = await axios.post(
          `${process.env.REACT_APP_SERVER_URL}user-management/apis/user/${id}/token`,
          {
            accessToken: LocalStorageService.getAccessToken(),
            refreshToken: LocalStorageService.getRefreshToken(),
          }
        );
        LocalStorageService.setToken(response.data);
        return instance.request(originalRequest);
      } catch (error) {
        // if failed then navigate the user to login page.
        window.location.href = "/login";
        console.log(error);
      }
    }
    return Promise.reject(error);
  }
);

export default instance;
