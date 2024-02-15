import { Button } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import TextAreaChangeHandler from "../../../../../components/UI/Inputs/TextArea";
import TextInput from "../../../../../components/UI/Inputs/TextInput";
import submitComment from "../../../functions/submitComment";

function AddCommentComponent(props) {
  const setCommentBoxState = props.setState;
  const [comment, setComment] = useState("");
  const [alias, setAlias] = useState("");
  const submissionId = useSelector((state) => state.details.submissionId);

  const dispatch = useDispatch();

  const cancelHandler = () => {
    setCommentBoxState(false);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const data = {
      parent: null,
      full_text: comment,
      alias,
    };
    try {
      await submitComment(submissionId, data, dispatch);
      setComment("");
      setAlias("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="comment-section w-full py-2">
      <form action="" className="flex flex-col items-center justify-center">
        <TextAreaChangeHandler
          className="w-10/12 border border-solid border-theme-blue bg-gray-100 p-2"
          setState={setComment}
          placeHolder="Reply to this post."
          value={comment}
        />
        <div className="alias flex w-10/12 flex-row gap-2 py-2 pt-4">
          <p className="text-theme-blue">Reply as: </p>
          <TextInput
            className="border border-theme-blue bg-gray-100  text-sm"
            setState={setAlias}
            placeHolder="Optional."
            value={alias}
          />
        </div>

        <div className="btns py-2">
          <Button size="small" onClick={cancelHandler}>
            Cancel
          </Button>
          <Button onClick={onSubmitHandler} type="submit" size="small">
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
}

export default AddCommentComponent;
