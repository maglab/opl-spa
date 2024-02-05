import { useState } from "react";
import SourcesList from "./SourcesList";
import setUserName from "../../../functions/setUserName";
import CommentsButton from "../Comments/CommentsButton";
import Comments from "../Comments/Comments";
import setDate from "../../../../../utils/functions/setDate";
import { useDispatch } from "react-redux";
import { detailsActions } from "../../../../../state/Details/detailsSlice";

function SubmissionComponent(props) {
  const dispatch = useDispatch();
  const {
    full_text: fullText,
    created_at: date,
    submission_id: id,
    first_name: firstName,
    last_name: lastName,
    affiliation,
  } = props.data;
  const createdDate = setDate(date);
  const userName = setUserName({ firstName, lastName, affiliation });

  // Dispatch state to store the submissionId only when component is mounted
  dispatch(detailsActions.setState({ key: "submissionId", value: id }));

  // Set state for showing comments
  const [commentsIsDisplayed, displayComments] = useState(false);
  return (
    <div className="component flex flex-col py-4 ">
      <div className="submission-details flex flex-row justify-between">
        <p className="text-sm">Submitted by: {userName} </p>
        <p className="text-sm"> Date: {createdDate} </p>
      </div>
      <hr />
      <div className="post bg-gray-100 px-6 py-6">
        <p className="text-base">{fullText}</p>
      </div>
      <hr />
      <div className="sources bg-gray-100 px-6 py-2 pt-6">
        <h1 className="text-sm underline">Sources:</h1>
        <ul>
          <SourcesList />
        </ul>
      </div>
      <CommentsButton
        submissionId={id}
        setState={displayComments}
        state={commentsIsDisplayed}
      />
      {commentsIsDisplayed && <Comments submissionId={id} />}
    </div>
  );
}

export default SubmissionComponent;
