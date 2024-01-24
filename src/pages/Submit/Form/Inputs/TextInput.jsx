import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { HashLink } from "react-router-hash-link";
import { LinearProgress } from "@mui/material";

import { questionActions } from "../../../../state/Question/questionSlice";
import { formActions } from "../../../../state/Question/questionFormSlice";
import apiProblems from "../../../../api/apiProblems";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

function ExitIcon({ setState }) {
  const onClickHandler = () => {
    setState(false);
  };
  return (
    <IconButton onClick={onClickHandler} size="medium" style={{ color: "red" }}>
      <CloseIcon fontSize="medium" />
    </IconButton>
  );
}

/**
 * Loading section component for title input.
 * @returns {React.Component}
 */
function LoadingSection() {
  return (
    <div className="w-full">
      <LinearProgress />
    </div>
  );
}

/**
 * List component to render open problems titles that are similar to the input title.
 * @param {Array} openProblems - List of open problems sent by the API.
 * @param {Function} setToDisplay - useState function to be used to display or not display the Problems List
 * @returns {React.Component}
 */
function ProblemsList({ similarProblems, setToDisplay }) {
  return (
    <div className="absolute right-0 top-full mt-2 max-h-40 w-full overflow-y-auto border border-theme-blue bg-white z-10">
      <div className="flex items-center">
        <h1 className="flex-grow text-small font-semibold md:text-base text-center">
          Similar submitted problems:
        </h1>
        <div className="ml-auto">
          <ExitIcon setState={setToDisplay} />
        </div>
      </div>
      <ul className="">
        {similarProblems.map((problem) => (
          <li
            key={problem.problem_id}
            className="px-2 py-1 text-sm md:text-base"
          >
            <HashLink
              smooth
              to={
                "/open-problems/" +
                problem.problem_id +
                "#title" +
                problem.problem_id
              }
              className="hover:text-theme-blue hover:underline"
            >
              {problem.title}
            </HashLink>
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * Text input component specifically for Open Problems Form. This Text Input component returns open problems with similar titles from the API.
 * @param {String} id - String to ID text tag.
 * @param {String} label - Placeholder for input box
 * @param {String} labelText - Text to label input box
 * @param {Boolean} required - Sets required on the input box.
 * @returns {React.Component}
 */
export function TextInputTitle({ id, label, labelText, required }) {
  const formTitle = useSelector((state) => state.form.formDetails.title);
  const isMobileState = useSelector((state) => state.question.isMobile);
  const dispatch = useDispatch();

  // State for getting similar problems from input
  const [similarProblems, setSimilarProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [toDisplay, setToDisplay] = useState(false);

  //Search
  useEffect(() => {
    setLoading(true);
    async function searchProblems(searchQuery) {
      try {
        //Remember that results from the API are paginated!!
        const queryParams = { search: searchQuery };
        const response = await apiProblems.getProblems({ queryParams });
        setSimilarProblems(response.data.results);
        setLoading(false);
        setToDisplay(true);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    }

    const timer = setTimeout(() => {
      searchProblems(formTitle);
    }, 1500);
    return () => clearTimeout(timer);
  }, [formTitle]);

  const onChangeHandler = (e) => {
    dispatch(formActions.inputChange({ id: "title", value: e.target.value }));
  };

  return (
    <div className="flex flex-col">
      <div
        className={`flex w-full ${
          isMobileState ? "flex-col" : "flex-row"
        } items-center py-[1.5rem] text-center`}
      >
        <label
          className={`inline-block text-center ${
            isMobileState ? "w-full" : "w-1/6"
          }`}
          htmlFor={id}
        >
          <p className="text-sm font-bold md:text-base">{labelText}</p>
        </label>
        <div className={`relative ${isMobileState ? "w-full" : "w-4/5"}`}>
          <input
            onChange={onChangeHandler}
            type="text"
            className="h-fit-content h-auto w-full rounded border border-slate-500 bg-bg-grey p-2"
            required={required}
            value={formTitle}
            placeholder={label}
            name={id}
          />
          {formTitle.length > 0 && loading && <LoadingSection />}
          {formTitle.length > 0 &&
            toDisplay &&
            similarProblems.length > 0 &&
            !loading && (
              <ProblemsList
                similarProblems={similarProblems}
                setToDisplay={setToDisplay}
              />
            )}
        </div>
      </div>
    </div>
  );
}

function TextInput({ id, label, labelText, required }) {
  const formDetails = useSelector((state) => state.form.formDetails);
  const isMobileState = useSelector((state) => state.question.isMobile);
  const dispatch = useDispatch();

  const onChangeHandler = (e) => {
    dispatch(formActions.inputChange({ id: id, value: e.target.value }));
    dispatch(questionActions.setState({ key: "filterOpen", value: false }));
  };

  return (
    <div className="flex flex-col">
      <div
        className={`flex w-full ${
          isMobileState ? "flex-col" : "flex-row"
        } items-center py-[1.5rem] text-center`}
      >
        <label
          className={`inline-block text-center ${
            isMobileState ? "w-full" : "w-1/6"
          }`}
          htmlFor={id}
        >
          <p className="text-sm font-bold md:text-base">{labelText}</p>
        </label>
        <div className={`relative ${isMobileState ? "w-full" : "w-4/5"}`}>
          <input
            onChange={onChangeHandler}
            type="text"
            className="h-fit-content h-auto w-full rounded border border-slate-500 bg-bg-grey p-2"
            required={required}
            value={formDetails[id]}
            placeholder={label}
            name={id}
          />
        </div>
      </div>
    </div>
  );
}

export default TextInput;
