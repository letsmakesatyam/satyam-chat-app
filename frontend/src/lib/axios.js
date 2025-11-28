
import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: import.meta.env.MODE === "development"
        ? "http://localhost:5001/api"
        : "/api", // ✅ CHANGED: Use "/api" instead of undefined env variable
    withCredentials: true,
});