import Section from "./Section/Section";
import { useDispatch } from "react-redux";
import { DEFAULT_STATE } from "../../../state/Question/questionSlice";
import { questionActions } from "../../../state/Question/questionSlice";

function ClearButton({ children, onClick, className }) {
  return (
    <button onClick={onClick} className={className}>
      {children}
    </button>
  );
}

function Filter({ config }) {
  //Will have to create redux state to track whether this is open or not?
  const dispatch = useDispatch();
  const onClickHandler = () => {
    //Function to clear the filters applied from the sidenav
    dispatch(
      questionActions.setState({ key: "filters", value: DEFAULT_STATE.filters })
    );
  };

  return (
    <div className="side-navigation flex h-full w-full flex-col   text-theme-blue-shade">
      <div className="bg-white w-full border py-3  flex flex-col items-center gap-y-6">
        <h1 className="text-center font-semibold">Filters </h1>
        <ClearButton
          className="h-max w-full border p-2    bg-theme-blue-light"
          onClick={onClickHandler}
        >
          <p className="text-sm hover:font-semibold"> Clear all</p>
        </ClearButton>
      </div>

      <form className="flex flex-col ">
        {config &&
          config.map((section) => (
            <Section
              key={section.title}
              section={section.title.toLowerCase()}
              classNames="nav-section w-full bg-white  p-2  "
              title={section.title}
            />
          ))}
      </form>
    </div>
  );
}

export default Filter;
