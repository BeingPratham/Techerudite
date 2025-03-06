import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });

export const registerUser = (data) => API.post("/register", data);
export const adminLogin = (data) => API.post("/admin-login", data);
