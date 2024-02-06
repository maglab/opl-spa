import { useState, useEffect } from "react";
import { HashLink } from "react-router-hash-link";
import { LinearProgress } from "@mui/material";
import { useField } from "formik";

import apiProblems from "../../../../api/apiProblems";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import useViewWidth from "../../../../utils/hooks/useViewWidth";

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
    <div className="absolute top-full right-0 mt-2 max-h-40 w-full overflow-y-auto border border-theme-blue bg-white z-10">
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
 * @param {String} id - Id for label tag
 * @param {String} label - Label text
 * @param {String} name - Name required for formik to track values of input
 * @param {String} type - Sets type of input
 * @param {String} placeHolder - Placeholder text
 * @returns {React.Component}
 */
export function TitleInput({ id, label, name, type, placeHolder }) {
  const { isMobile } = useViewWidth();
  const [field, meta] = useField(name, type);

  const { value: formTitle } = meta; //We track the form title

  // State for getting similar problems from input
  const [similarProblems, setSimilarProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false); //No conditional renderring for errors as of yet
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

  return (
    <div
      className={`items-center text-center grid ${
        isMobile ? "grid-cols-1" : "grid-cols-[20%_80%]"
      }`}
    >
      <label htmlFor={id} className="font-semibold font-lg">
        {label}
      </label>
      <div className="w-full">
        <input
          type={type}
          name={name}
          {...field}
          required={true}
          placeholder={placeHolder}
          className="text-input h-fit-content h-auto w-full rounded-border border border-slate-500 bg-bg-grey p-2"
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
  );
}

export default TitleInput;
