import { Button } from "@mui/material";
function SubmissionModalContent(props) {
  const onSubmitClose = props.close;
  const submitStatus = props.submitStatus;
  return (
    <div className="p-2">
      <h1 className="text-center text-lg font-bold md:text-2xl">
        {submitStatus.title}
      </h1>
      <p className="text-md pt-4 md:text-lg">{submitStatus.message}</p>
      <div className="flex flex-row justify-center p-2">
        <Button onClick={onSubmitClose}>Exit</Button>
      </div>
    </div>
  );
}
export default SubmissionModalContent;
