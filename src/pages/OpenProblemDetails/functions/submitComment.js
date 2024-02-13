import api from "../../../api/apiComments";
import showModal from "../../../utils/functions/showModal";

function submitComment(submissionId, data, dispatch) {
  return new Promise(async (resolve, reject) => {
    const trimmedText = data.full_text.trim();
    if (trimmedText.length > 0) {
      try {
        const response = await api.postComment({ submissionId, data });
        if (response.status == 201) {
          showModal(
            dispatch,
            "Success",
            "Your comment has been submitted successfully for review",
            "success",
          );
          resolve();
        } else {
          // If the response status is not 201, consider it as an error. Adjust as needed.
          showModal(dispatch, "Failed", "Comment submission failed.", "failed");
          reject(new Error("Comment submission failed."));
        }
      } catch (error) {
        showModal(dispatch, "Failed", error.message, "failed");
        reject(error);
      }
    } else {
      showModal(dispatch, "Failed", "Empty fields", "failed");
      reject(new Error("Empty fields"));
    }
  });
}
export default submitComment;
