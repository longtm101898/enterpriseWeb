import axios from "axios";

const ewApi = axios.create({
  baseURL: "http://localhost:49763/api/",
  headers: { "Content-Type": "application/json" }
});

export default ewApi;
