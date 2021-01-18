import axiosClient from "../axiosClient";

const userApi = {
  login: (data) => {
    const url = "users/login";
    return axiosClient.post(url, data);
  },
  get: (user_id) => {
    const url = `users/${user_id}`;
    return axiosClient.get(url);
  },
  getAll: (params) => {
    const url = "users/";
    return axiosClient.get(url);
  },
  signup: (data) => {
    const url = "users/signup";
    return axiosClient.post(url, data);
  },
  changePass: (params, data) => {
    const url = `users/password/${params}`;
    return axiosClient.patch(url, data);
  }
};

export default userApi;
