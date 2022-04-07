import axios from "axios";

export const axiosPrivate = axios.create({ baseURL: process.env.REACT_APP_API, withCredentials: true, credentials: 'include' });