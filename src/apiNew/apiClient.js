import axios from "axios";
import { getWebApiUrl } from "../config";

const apiClient = axios.create({
  baseURL: getWebApiUrl(),
});

export default apiClient;
