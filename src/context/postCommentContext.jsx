import React, { createContext, useMemo } from "react";

const postInitialValues = {
  postType: "",
};

export function PostProvider({ sectionType, children }) {
  // Add other post and comment related state and functions as needed
  const contextValue = useMemo(() => ({ postType: sectionType }));
  return (
    <PostContext.Provider value={contextValue}>{children}</PostContext.Provider>
  );
}
export const PostContext = createContext(postInitialValues);
