import { useSelector, useDispatch } from "react-redux";
import { detailsActions } from "../../../../state/Details/detailsSlice";
function TextInput() {
  const textState = useSelector(
    (state) => state.details.submission.description,
  );
  const dispatch = useDispatch();
  const descriptionHandler = (e) => {
    const value = e.target.value;
    dispatch(detailsActions.setFormValue({ id: "description", value: value }));
  };
  return (
    <div className="m-auto flex w-9/12 flex-col px-6 py-2 pb-8 text-sm">
      <textarea
        onChange={descriptionHandler}
        value={textState}
        id="description"
        className="h-32 border border-theme-blue bg-bg-grey p-2"
      ></textarea>
    </div>
  );
}

export default TextInput;
