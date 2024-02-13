import { useSelector, useDispatch } from "react-redux";
import { formActions } from "../../../../state/Question/questionFormSlice";

function Select(props) {
  const formDetailsState = useSelector((state) => state.form.formDetails);
  const isMobileState = useSelector((state) => state.question.isMobile);
  const { openProblems } = props;
  const dispatch = useDispatch();
  const changeHandler = (e) => {
    if (e.target.value === "Submit as a root problem") {
      dispatch(
        formActions.chooseParent({
          chosenParentTitle: "",
          parentId: null,
        }),
      );
    } else {
      const index = e.target.selectedIndex;
      const el = e.target.childNodes[index];
      const optionId = el.getAttribute("id");
      dispatch(
        formActions.chooseParent({
          chosenParentTitle: e.target.value,
          parentId: optionId,
        }),
      );
    }
  };

  return (
    <div
      className={`${props.id} flex w-full ${
        isMobileState ? "flex-col" : "flex-row"
      } items-center py-[1.5rem] text-center`}
    >
      <label
        htmlFor={props.id}
        className={`inline-block ${isMobileState ? "w-full" : "w-1/5"}`}
      >
        <p className="text-sm font-bold md:text-base">
          Associated Open Problem:
        </p>
      </label>
      <select
        onChange={changeHandler}
        id={props.id}
        name={props.name}
        className={`h-fit-content h-auto ${
          isMobileState ? "w-full" : "w-4/5"
        } rounded border border-slate-500 bg-bg-grey p-2`}
        value={formDetailsState.parentTitle || "Submit as a root problem"}
      >
        {openProblems.map((problem) => (
          <option
            value={problem.title}
            key={problem.problem_id}
            id={problem.problem_id}
          >
            {problem.title}
          </option>
        ))}
        <option value="Submit as a root problem" id="None">
          Submit as a root problem
        </option>
      </select>
    </div>
  );
}

export default Select;
