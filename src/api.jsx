import axios from "axios";
import { apiRoot } from "./const";

const api = axios.create({
  baseURL: `${apiRoot}fetch/`,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  config.headers.Authorization = `Bearer ${token}`;

  return config;
});

api.interceptors.response.use((res) => {
  console.debug(res.data);
  return res;
});

export default api;
