import axios from "axios";
import queryString from "query-string";
import Cookies from "js-cookie";

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "content-type": "application/json",
  },
  paramsSerializer: (params) => queryString.stringify(params),
});

axiosClient.interceptors.request.use(async (config) => {
  const account = Cookies.getJSON("account");
  config.headers.authorization =  `Bearer ${account.token}`;
  return config;
});

axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }

    return response;
  },
  (error) => {
    // Handle errors
    throw error;
  }
);
export const axiosClient1 = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    "content-type": "multipart/form-data",
  },
  paramsSerializer: (params) => queryString.stringify(params),
});

axiosClient1.interceptors.request.use(async (config) => {
  const account = Cookies.getJSON("account");
  config.headers.authorization =  `Bearer ${account.token}`;
  return config;
});

axiosClient1.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }

    return response;
  },
  (error) => {
    // Handle errors
    throw error;
  }
);
export default axiosClient;
