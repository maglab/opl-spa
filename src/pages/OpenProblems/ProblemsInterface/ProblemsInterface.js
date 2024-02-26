import { useSelector, useDispatch } from "react-redux";
import { Stack } from "@mui/system";
import { List, ToggleButton, ToggleButtonGroup } from "@mui/material";

import { questionActions } from "../../../state/Question/questionSlice";
import QuestionForm from "../Form/QuestionForm";
import MuiListComponent from "./MuiListComponent";

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
    <>
      <ToggleButtonGroup
        color="primary"
        onChange={onChange}
        size="small"
        exclusive={true}
        value={sorting}
      >
        <ToggleButton value="latest">Latest</ToggleButton>
        <ToggleButton value="top"> Top </ToggleButton>
        <ToggleButton value="answered">Answered</ToggleButton>
      </ToggleButtonGroup>
    </>
  );
}

function ProblemList() {
  const allProblems = useSelector((state) => state.question.allProblems);
  const filteredQuestions = useSelector(
    (state) => state.question.filteredResults
  );
  // Ensure filteredQuestions and allProblems are arrays before mapping
  const problemsToRender = filteredQuestions || allProblems || [];

  return (
    <List sx={{ width: "100%" }}>
      {problemsToRender.map((problem) => (
        <MuiListComponent key={problem.problem_id} problem={problem} />
      ))}
    </List>
  );
}

function ProblemsInterface({ error }) {
  const formState = useSelector((state) => state.form);
  return (
    <>
      {formState.submitFormOpen ? (
        <QuestionForm
          parent={
            formState.chosenParent ? formState.formDetails.parentTitle : "None"
          }
        />
      ) : (
        <Stack
          direction="column"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <SortingInputs />
          <ProblemList />
        </Stack>
      )}
    </>
  );
}

export default ProblemsInterface;
