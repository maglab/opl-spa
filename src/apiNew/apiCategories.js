import apiClient from "./apiClient";

export const getCategories = async () => apiClient.get("/categories");
export const getCategory = async (id) => apiClient.get(`/categories/${id}`);
