import axios from "axios";
import { awsConf } from "./amplify";

const api = axios.create({
  baseURL: awsConf.apiGateway.URL,
});

// api.interceptors.request.use(async (config) => {
//   const token = localStorage.getItem("accessToken");
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

export default api;
