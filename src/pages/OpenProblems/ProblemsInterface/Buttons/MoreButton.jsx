import withRipple from "../../../../utils/hoc/withRipple";
import apiClient, { apiRequest } from "../../../../api/apiClient";
import { questionActions } from "../../../../state/Question/questionSlice";
import Spinner from "../../../../components/UI/Loading/Spinner";

import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";

async function getNextPage(url) {
  return apiRequest(() => apiClient.get(url));
}

function Loading() {
  return (
    <div>
      <Spinner />
    </div>
  );
}

function Button({ onClickHandler }) {
  return (
    <button
      onClick={onClickHandler}
      className="w-full text-base font-semibold p-3 border border-theme-blue rounded-md bg-theme-blue-light"
    >
      {" "}
      MORE{" "}
    </button>
  );
}

//The button turns into a loading spinner instead when loading
function MoreButton() {
  const dispatch = useDispatch();
  const nextPage = useSelector((state) => state.question.nextPage);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  // Button click needs to send api request to add more to the open problems list
  const onClickHandler = async () => {
    if (!nextPage) return;
    setLoading(true);
    //Call the api for the next page and then concatenate the array of results to the redux store.
    //The nextpage url given by the api retains all the query parameters so we can just use the stored url
    const { data } = await getNextPage(nextPage);
    const openProblems = data.results;
    const apiNextPage = data.next;
    dispatch(
      questionActions.concatenateArrays({
        key: "allProblems",
        array: openProblems,
      })
    );
    dispatch(questionActions.setState({ key: "nextPage", value: apiNextPage }));
    setLoading(false);
  };

  const ButtonComponent = withRipple(Button);

  if (loading) {
    return <Loading />;
  }
  return <ButtonComponent onClickHandler={onClickHandler} />;
}

export default MoreButton;
