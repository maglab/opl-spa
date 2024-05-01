import axios from "axios";
import { getWebApiUrl } from "../config";

const apiClient = axios.create({
  baseURL: getWebApiUrl(),
  headers: {
    "Content-Type": "application/json",
  },
  xsrfCookieName: "csrftoken",
  xsrfHeaderName: "X-CSRFTOKEN",
});

export default apiClient;
