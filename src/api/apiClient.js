import axios from "axios";
import { get_web_api_url } from "../config";

// Create an instance of Axios with default configuration
const apiClient = axios.create({
  baseURL: get_web_api_url(document.location), // Replace with API base URL
  timeout: 10000, // Request timeout in milliseconds
  headers: {
    "Content-Type": "application/json", // Set appropriate headers if needed
  },
});

export async function apiRequest(callback) {
  try {
    const response = await callback();
    return response;
  } catch (error) {
    return error;
  }
}

export default apiClient;
