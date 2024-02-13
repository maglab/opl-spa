import { Button } from "@mui/material";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useSelector } from "react-redux";
import useGetApi from "../../../../../utils/hooks/useApi";
import api from "../../../../../api/apiComments";

function CommentsButton(props) {
  const { setState } = props;
  const submissionId = useSelector((state) => state.details.submissionId);
  const isDisplayed = props.state;
  const onClickHandler = () => {
    setState(!isDisplayed);
  };

  // Getting comments from api
  const { apiData: comments } = useGetApi(api.getComments, { submissionId });

  return (
    <div>
      <Button onClick={onClickHandler} size="small">
        {" "}
        {comments && comments.length} Comments{" "}
        {isDisplayed ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
      </Button>
    </div>
  );
}

export default CommentsButton;
