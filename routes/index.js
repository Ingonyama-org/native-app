import axios from "axios";

export const nodeInstance = axios.create({
  // baseURL: "https://native-app-node.azurewebsites.net",
  // baseURL: "http://192.168.0.24:8001",
  baseURL: "http://192.168.43.168:5000",
});
export const flaskAuthInstance = axios.create({
  // baseURL: "https://ingonyama-backend-py.azurewebsites.net/auth/app",
  // baseURL: "http://192.168.0.24:5050/auth/app",
  baseURL: "http://192.168.43.168:5050/auth/app",
});
export const flaskViewInstance = axios.create({
  // baseURL: "https://ingonyama-backend-py.azurewebsites.net/views",
  // baseURL: "http://192.168.0.24:5050/views/",
  baseURL: "http://192.168.43.168:5050/views/",
});
