import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import { useDispatch, useSelector } from "react-redux";

import { questionActions } from "../../../state/Question/questionSlice";
import { formActions } from "../../../state/Question/questionFormSlice";
import TooltipWrapper from "../../../components/UI/ToolTip/TooltipWrapper";

function StatbarButtonGroupView() {
  const dispatch = useDispatch();
  const isMobileState = useSelector((state) => state.question.isMobile);
  const viewState = useSelector((state) => state.question.viewType);

  const handleView = (e, value) => {
    dispatch(formActions.toggleFalse({ key: "submitFormOpen" }));
    switch (value) {
      case "tree":
        dispatch(questionActions.setSorting({ value: "root" }));
        dispatch(questionActions.setSearchResults({ results: null }));
        break;
      case "table":
        dispatch(questionActions.setSorting({ value: "latest" }));
        break;
    }

    dispatch(questionActions.setSearchResults({ results: null }));
    dispatch(questionActions.setState({ key: "viewType", value }));
  };

  return (
    <ToggleButtonGroup
      value={viewState}
      onChange={handleView}
      exclusive
      size="small"
      className="h-full w-1/4"
      aria-label="view-state"
    >
      <ToggleButton
        value="table"
        className={`${isMobileState ? "w-1/3" : null}`}
        aria-label="view-list"
      >
        <TooltipWrapper message="View all problems">
          <FormatListBulletedIcon />
        </TooltipWrapper>
      </ToggleButton>
      <ToggleButton
        value="tree"
        className={`${isMobileState ? "w-1/3" : null}`}
        aria-label="view-tree"
      >
        <TooltipWrapper message="View problems a hierarchical list">
          <AccountTreeIcon />
        </TooltipWrapper>
      </ToggleButton>
    </ToggleButtonGroup>
  );
}

export default StatbarButtonGroupView;
