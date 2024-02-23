import { useSelector } from "react-redux";
import { Stack } from "@mui/system";
import QuestionForm from "../Form/QuestionForm";
import SortingInputs from "./Sorting/SortingInputs";
import MuiListComponent from "./List/MuiListComponent";
import { List } from "@mui/material";

function ProblemList() {
  const allProblems = useSelector((state) => state.question.allProblems);
  const filteredQuestions = useSelector(
    (state) => state.question.filteredResults
  );
  // Ensure filteredQuestions and allProblems are arrays before mapping
  const problemsToRender = filteredQuestions || allProblems || [];

  return (
    <List>
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
