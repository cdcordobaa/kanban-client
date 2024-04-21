import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3000/dev";

const api = axios.create({
  baseURL: API_URL,
  // Add more configuration as needed
});

// Example function to add authentication token
api.interceptors.request.use(async (config) => {
  if (process.env.NODE_ENV === "production") {
    // Integrate AWS Cognito here to get the token
    const token = "your_token_from_cognito";
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
