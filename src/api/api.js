import axios from "axios";

const api = axios.create({
  // baseURL: "http://localhost:8080/api", //dev
  baseURL: "https://chutney-backend-service-5.onrender.com/api", //for deployment
});

export default api;
