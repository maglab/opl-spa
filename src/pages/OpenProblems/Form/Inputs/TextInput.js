import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { formActions } from "../../../../state/Question/questionFormSlice";
import { formValidationActions } from "../../../../state/Question/formValidationSlice";
import { HashLink } from "react-router-hash-link";
import Fuse from "fuse.js";
function TextInput({ openProblems, id, label, labelText, required }) {
  const formDetailsState = useSelector((state) => state.form.formDetails);
  const isMobileState = useSelector((state) => state.question.isMobile);
  const dispatch = useDispatch();

  // State for getting similar problems from input
  const MIN_INPUT_LENGTH_FOR_SIMILAR = 2;
  const [similarProblems, setSimilarProblems] = useState([]);
  useEffect(() => {
    if (!id === "title") {
      return;
    } else {
      if (openProblems) {
        const inputTitle = formDetailsState.title.toLowerCase();
        const fuseOptions = {
          keys: ["title"], // The property to search for similarity
        };
        const fuse = new Fuse(openProblems, fuseOptions);
        if (inputTitle.length > MIN_INPUT_LENGTH_FOR_SIMILAR) {
          const similarProblemsFilter = fuse.search(inputTitle);
          setSimilarProblems(
            similarProblemsFilter.map((result) => result.item)
          );
        } else {
          setSimilarProblems([]);
        }
      }
    }
  }, [formDetailsState.title, id, openProblems]);
  const onChangeHandler = (e, key) => {
    dispatch(formActions.inputChange({ id: key, value: e.target.value }));
    switch (key) {
      case "title":
        dispatch(formValidationActions.checkTitle({ title: e.target.value }));
        break;
      case "email":
        dispatch(formValidationActions.checkEmail({ email: e.target.value }));
        break;
      default:
    }
  };

  return (
    <div className="flex flex-col">
      <div
        className={`flex w-full ${
          isMobileState ? "flex-col" : "flex-row"
        } items-center py-[1.5rem] text-center`}
      >
        <label
          className={`inline-block ${isMobileState ? "w-full" : "w-1/5"}`}
          htmlFor={id}
        >
          <p className="text-sm font-bold md:text-base">{labelText}</p>
        </label>
        <div className={`relative ${isMobileState ? "w-full" : "w-4/5"}`}>
          <input
            onChange={(e) => onChangeHandler(e, id)}
            type="text"
            className="h-fit-content h-auto w-full rounded border border-slate-500 bg-bg-grey p-2"
            required={required}
            value={formDetailsState[id]}
            placeholder={label}
            name={id}
          />
          {id === "title" &&
            formDetailsState.title.length > 0 &&
            similarProblems.length > 0 && (
              <div className="relative right-0 top-full mt-2 max-h-40 w-full overflow-y-auto border border-theme-blue bg-white">
                <h1 className="text-small font-semibold md:text-base">
                  Similar submitted problems:
                </h1>
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
            )}
        </div>
      </div>
    </div>
  );
}

export default TextInput;
