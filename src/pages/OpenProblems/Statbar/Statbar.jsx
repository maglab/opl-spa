import { Box } from "@mui/material";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { questionActions } from "../../../state/Question/questionSlice";
import StatbarButtonGroupView from "./StatbarButtonGroupView";
import scrollToView from "../../../utils/functions/scrollToView";

/**
 * Statbar - App bar that allows the user to select whether to view the questions as a table or as a tree view instead
 * @returns {React.Component}
 */
function Statbar() {
  const navigate = useNavigate();
  const problemsLength = useSelector((state) => state.question.count);
  const isMobileState = useSelector((state) => state.question.isMobile);
  const dispatch = useDispatch();
  const submitQuestionHandler = () => {
    navigate("/submit/");
    dispatch(questionActions.setState({ key: "filterOpen", value: false }));
    scrollToView(".form-title");
  };

  return (
    <Box className="h-max">
      <div className="flex h-12 w-full items-center justify-between shadow shadow-theme-blue ">
        <div className="h-full w-1/4">
          <StatbarButtonGroupView />
        </div>
        <div className="flex h-full w-1/4 flex-grow-0 items-center justify-center">
          <p className="text-center text-xs font-semibold md:text-base">
            {problemsLength && problemsLength} Open Problems
          </p>
        </div>
        <div className="flex h-full w-1/4 justify-end">
          <button
            onClick={submitQuestionHandler}
            className="h-full w-max rounded-md border border-solid bg-white hover:bg-theme-blue hover:font-bold active:bg-theme-blue-light text-base p-2"
          >
            {isMobileState ? (
              <FileUploadIcon className="h-full w-full" />
            ) : (
              "Submit"
            )}
          </button>
        </div>
      </div>
    </Box>
  );
}

export default Statbar;
