import axios from "axios";
// Create an instance of Axios with default configuration
const apiClient = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL, // Replace with API base URL
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
