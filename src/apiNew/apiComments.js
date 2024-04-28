import apiClient from "./apiClient";

export const post = ({ id, postType, postRequestData }) =>
  apiClient.post(
    `posts/post/${id}/${postType}/comment/submit`,
    postRequestData
  );

export const getAll = ({ id, postType, params }) =>
  apiClient.get(`posts/${id}/${postType}/comments`, { params });
