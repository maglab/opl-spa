import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { List, Grid, Typography } from "@mui/material";
import MuiListComponent from "../List/MuiListComponent";
import ButtonGroupComponent from "../ButtonGroup/ButtonGroupComponent";
import apiSubmissions from "../../../../api/apiSubmissions";
import { formActions } from "../../../../state/Question/questionFormSlice";

function ListAccordionContent({ problem, parent }) {
  const dispatch = useDispatch();
  const children = problem.children;
  const isRoot = parent ? true : false;

  //Button handlers
  const [counts, setCounts] = useState(0);
  const [feedbackOpen, setFeedbackOpen] = useState(false);

  const formHandler = () => {
    dispatch(formActions.toggleFormOpen());
    dispatch(
      formActions.chooseParent({
        chosenParentTitle: problem.title,
        parentId: problem.problem_id,
      })
    );
  };

  useEffect(() => {
    const problemId = problem.problem_id;
    async function getSubmissionCount() {
      try {
        const response = await apiSubmissions.getSubmissionCount({ problemId });
        const counts = response.data.post_counts;
        setCounts(counts);
      } catch (error) {
        console.log(error);
      }
    }
    getSubmissionCount();
  }, [problem.problem_id]);

  return (
    <Grid container direction="column" spacing={2} p={2} width="100%">
      <Grid item xs={12}>
        <Typography variant="body1">
          {problem.description && problem.description}
        </Typography>
      </Grid>
      <Grid
        item
        xs={12}
        justifyContent="center"
        alignItems="center"
        display="flex"
      >
        <ButtonGroupComponent
          openProblem={problem}
          isRoot={isRoot}
          counts={counts}
          formHandler={formHandler}
          feedbackOpen={feedbackOpen}
          setFeedbackOpen={setFeedbackOpen}
        />
      </Grid>
      <Grid item className="problems">
        <Typography variant="h5">Connected Open Problems</Typography>
        {children.length > 0 ? (
          <List sx={{ width: "100%" }} variant="outlined">
            {children.map((item, index) => (
              <MuiListComponent key={index} title={item.title} problem={item} />
            ))}
          </List>
        ) : (
          <Typography variant="subtitle1">None</Typography>
        )}
      </Grid>
    </Grid>
  );
}

export default ListAccordionContent;
