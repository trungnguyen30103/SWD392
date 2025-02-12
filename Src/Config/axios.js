import axios from "axios";

// Set up base URL and timeout
// const baseUrl = "https://diamondshopproject.azurewebsites.net/";
const baseUrl = "http://localhost:8080/";
const config = {
  baseURL: baseUrl,
  timeout: 3000000,
};

// Create an Axios instance
const api = axios.create(config);

// Request interceptor to add Authorization header
api.interceptors.request.use(
  (config) => {
    // Retrieve token from localStorage
    const token = localStorage.getItem("token")?.replaceAll('"', "");

    // Check if token exists
    if (token) {
      config.headers["Content-Type"] = "application/json";
      config.headers["Authorization"] = `Bearer ${token}`;
    } else {
      console.warn("No token found in localStorage");
    }

    return config;
  },
  (error) => {
    console.error("Error in request interceptor:", error);
    return Promise.reject(error);
  }
);



export default api;

