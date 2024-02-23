import React from "react";
import ButtonGroup from "@mui/material/ButtonGroup";
import ModeCommentIcon from "@mui/icons-material/ModeComment";
import AddBoxIcon from "@mui/icons-material/AddBox";
import FlagIcon from "@mui/icons-material/Flag";
import { Button, Tooltip } from "@mui/material";
import { HashLink } from "react-router-hash-link";
import FeedbackForm from "../../feeback";

function ButtonGroupComponent({
  openProblem,
  counts,
  feedbackOpen,
  setFeedbackOpen,
  formHandler,
  isRoot,
}) {
  const { problem_id: problemId } = openProblem;

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
          <Button onClick={formHandler} startIcon={<AddBoxIcon />}>
            Add Problem
          </Button>
        </Tooltip>
        <Tooltip>
          <Button
            color="error"
            startIcon={<FlagIcon />}
            onClick={() => setFeedbackOpen(true)}
          >
            Report
          </Button>
        </Tooltip>
      </ButtonGroup>
      <FeedbackForm
        open={feedbackOpen}
        onClose={() => setFeedbackOpen(false)}
        id={problemId}
      />
    </>
  );
}

export default ButtonGroupComponent;
