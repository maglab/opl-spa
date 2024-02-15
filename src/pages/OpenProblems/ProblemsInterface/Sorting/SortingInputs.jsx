import { ToggleButtonGroup, ToggleButton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { questionActions } from "../../../../state/Question/questionSlice";

function SortingInputs() {
  const dispatch = useDispatch();
  const sorting = useSelector((state) => state.question.filters.sorting);
  const onChange = (e, newValue) => {
    if (newValue !== null) {
      dispatch(questionActions.toggleListState());
      dispatch(questionActions.setSorting({ value: newValue }));
    }
  };

  return (
    <ToggleButtonGroup
      color="primary"
      onChange={onChange}
      size="small"
      exclusive
      value={sorting}
    >
      <ToggleButton value="latest">Latest</ToggleButton>
      <ToggleButton value="top"> Top </ToggleButton>
      <ToggleButton value="answered">Answered</ToggleButton>
    </ToggleButtonGroup>
  );
}

export default SortingInputs;
