import React, { useEffect, useState } from "react";
import ButtonGroup from "@mui/material/ButtonGroup";
import ModeCommentIcon from "@mui/icons-material/ModeComment";
import AddBoxIcon from "@mui/icons-material/AddBox";
import FlagIcon from "@mui/icons-material/Flag";
import { Button, Tooltip } from "@mui/material";
import { useDispatch } from "react-redux";
import { formActions } from "../../../../state/Question/questionFormSlice";
import { HashLink } from "react-router-hash-link";
import apiSubmissions from "../../../../api/apiSubmissions";
import FeedbackForm from "../../feeback";

function ButtonGroupComponent(props) {
  const { problem_id: problemId, title } = props.problem;

  const isRoot = props.isRoot;
  const dispatch = useDispatch();

  // State for post counts
  const [counts, setCounts] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    async function getSubmissionCount() {
      const response = await apiSubmissions.getSubmissionCount({ problemId });
      const counts = response.data.post_counts;
      setCounts(counts);
    }
    getSubmissionCount();
  });
  const onClickHandlerForm = () => {
    dispatch(formActions.toggleFormOpen());
    dispatch(
      formActions.chooseParent({
        chosenParentTitle: title,
        parentId: problemId,
      })
    );
  };

  const closeHandler = () => {
    setOpenDialog(false);
  };

  return (
    <>
      <ButtonGroup size="small" variant="outlined">
        {isRoot && (
          <Tooltip title="view solutions">
            <Button sx={{ fontsize: 10 }} startIcon={<ModeCommentIcon />}>
              <HashLink smooth to={`${problemId}#researchProposals`}>
                {counts} Solutions
              </HashLink>
            </Button>
          </Tooltip>
        )}
        <Tooltip title="Add a connected problem">
          <Button onClick={onClickHandlerForm} startIcon={<AddBoxIcon />}>
            Add Problem
          </Button>
        </Tooltip>
        <Tooltip>
          <Button
            color="error"
            startIcon={<FlagIcon />}
            onClick={() => setOpenDialog(true)}
          >
            Report
          </Button>
        </Tooltip>
      </ButtonGroup>
      <FeedbackForm open={openDialog} onClose={closeHandler} id={problemId} />
    </>
  );
}

export default ButtonGroupComponent;
