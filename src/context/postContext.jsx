import { createContext } from "react";

const initialValues = {
  postType: "",
};

const PostContext = createContext(initialValues);

export default PostContext;
