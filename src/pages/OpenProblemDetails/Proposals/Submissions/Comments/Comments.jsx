import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import api from "../../../../../api/apiComments";
import Modal from "../../../../../components/UI/Modal/Modal";
import { generalActions } from "../../../../../state/generalStateSlice";
import useGetApi from "../../../../../utils/hooks/useApi";
import AddCommentComponent from "./AddCommentComponent";
import CommentComponent from "./CommentComponent";

function Comments() {
  const dispatch = useDispatch();
  // const submissionId = props.submissionId;
  const modalState = useSelector((state) => state.general.modal);
  const submissionId = useSelector((state) => state.details.submissionId);

  // Get root comments first and then their children
  // For now we cannot have comments replying to comments
  const { apiData: rootComments } = useGetApi(api.getRootComments, {
    submissionId,
  });
  console.log(rootComments);
  const [toAddComment, addComment] = useState(false);

  const onClickHandler = () => {
    addComment(true);
  };
  const modalCloseHandler = () => {
    dispatch(generalActions.toggleModal());
  };
  return (
    <div className="comments-list flex flex-col items-start">
      <div className="flex w-full flex-col items-center justify-center">
        {rootComments &&
          rootComments.map((comment) => (
            <ul className="y-2 align-center w-10/12">
              <CommentComponent comment={comment} />
            </ul>
          ))}
        <button
          onClick={onClickHandler}
          className="my-4 w-10/12 text-left text-theme-blue underline"
        >
          Add comment
        </button>{" "}
        <div className=" w-10/12">
          {toAddComment && <AddCommentComponent setState={addComment} />}
        </div>
      </div>
      {modalState.isOpen && (
        <Modal open={modalState.isOpen}>
          <SubmissionModalContent
            close={modalCloseHandler}
            submitStatus={modalState.content}
          />
        </Modal>
      )}
    </div>
  );
}

export default Comments;
