import axios from "axios";

export const axiosPrivate = axios.create({ baseURL: "http://localhost:3001", withCredentials: true });