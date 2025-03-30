import axios from "axios";
const apiClient = axios.create({
  baseURL: "https://crewshift.virtuslabs.lol/",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export default apiClient;
