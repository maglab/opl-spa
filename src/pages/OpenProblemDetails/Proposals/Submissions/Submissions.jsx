import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";

import { detailsActions } from "../../../../state/Details/detailsSlice";
import apiSubmissions from "../../../../api/apiSubmissions";
import SubmissionComponent from "./Submission/SubmissionComponent";

function Submissions(props) {
  const problemId = props.id;
  const dispatch = useDispatch();
  const [submissions, setSubmissions] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getSubmissionsLength() {
      try {
        const response = await apiSubmissions.getSubmissions({
          problemId,
        });
        const { data } = response;
        dispatch(detailsActions.setPostsLength({ length: data.length }));
      } catch (error) {
        dispatch(detailsActions.setPostsLength({ length: "error loading" }));
      }
    }
    async function getSubmissions() {
      try {
        const response = await apiSubmissions.getSubmissions({
          problemId,
        });
        if (response.status === 202 || 200) {
          const { data } = response;
          setSubmissions(data);
        }
      } catch (error) {
        setError(error.message);
      }
    }

    if (problemId) {
      getSubmissionsLength();
      getSubmissions();
    }
  }, [problemId]);
  return (
    <>
      <hr className="border-theme-blue" />
      <div className="view py-4 pl-2">
        <div className="submissions">
          <h1 className="py-2 pb-4 text-lg font-semibold text-theme-blue md:text-xl">
            Submitted Solutions
          </h1>
          <div className="submitted-list border-y border-theme-blue py-2">
            {error && <p>{error}</p>}
            {!error && submissions.length > 0 ? (
              submissions.map((data) => <SubmissionComponent data={data} />)
            ) : (
              <p> No submitted solutions.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Submissions;
