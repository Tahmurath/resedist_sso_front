import axios from "axios";
//import { getAuthToken } from "../services/authService";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5173/",
  timeout: 5000,
  withCredentials: true,
  headers: {
    Accept: "application/json",
    //"Access-Control-Allow-Origin": "*",
    "Content-type": "application/json; charset=UTF-8"
  },
});

axiosInstance.interceptors.request.use((value) => {
  // if (getAuthToken()) {
  //   value.headers.Authorization = `Bearer ${getAuthToken()}`;
  // }
  return value;
});

export { axiosInstance };
