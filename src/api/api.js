import axios from "axios";

const api = axios.create({
  // baseURL: "http://localhost:8080/api",
  baseURL: "https://chutney-backend-service-5.onrender.com/api",
});

export default api;
