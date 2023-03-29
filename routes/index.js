import axios from "axios";

export const nodeInstance = axios.create({
  // baseURL: "https://ingonyama-node-v2.herokuapp.com",
  // baseURL: "http://192.168.0.24:8001",
  baseURL: "http://192.168.43.168:5000",
});
export const flaskAuthInstance = axios.create({
  // baseURL: "https://ingonyama-backend-v2.herokuapp.com/auth/app",
  // baseURL: "http://192.168.0.24:5050/auth/app",
  baseURL: "http://192.168.43.168:5050/auth/app",
});
export const flaskViewInstance = axios.create({
  // baseURL: "https://ingonyama-backend-v2.herokuapp.com/views",
  // baseURL: "http://192.168.0.24:5050/views/",
  baseURL: "http://192.168.43.168:5050/views/",
});
