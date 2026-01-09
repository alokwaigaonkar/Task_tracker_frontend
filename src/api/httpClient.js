import axios from "axios";

const httpClient = axios.create({
  baseURL: "https://task-tracker-backend-voa5.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default httpClient;