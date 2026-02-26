import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true,
});

export const signupApi = (data) => API.post("/auth/signup", data);

export const loginApi = (data) => API.post("/auth/login", data);

export const logoutApi = () => API.post("/auth/logout");

export const getMeApi = () => API.get("/auth/me");

