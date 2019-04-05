import axios from "axios";
import { toast } from "react-toastify";

const ewApi = axios.create({
  baseURL: "http://localhost:49763/api/",
  headers: { "Content-Type": "application/json" }
});

ewApi.interceptors.response.use(null, error => {
  const expectedError =
    error.response &&
    error.response.status > 404 &&
    error.response.status < 500;

  if (expectedError) {
    toast.error("An unexpected error occurrred.");
  }

  if (error.response.data) {
    toast.error(error.response.data);
  }

  return Promise.reject(error);
});

export default ewApi;
