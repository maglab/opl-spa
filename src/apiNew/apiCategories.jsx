import apiClient from "./apiClient";

const getCategories = async () => apiClient.get("/categories");

export default getCategories;
