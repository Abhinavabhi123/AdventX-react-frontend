import axios from "axios";

import Cookies from "js-cookie";

const AdminAxios = axios.create({
  baseURL: import.meta.env.VITE_ADMIN_API,
  headers: {
    "Content-Type": "application/json",
  },
});

AdminAxios.interceptors.request.use(
  function (config) {
    const token = Cookies.get("adminJwt");
    config.headers.Authorization = token;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default AdminAxios