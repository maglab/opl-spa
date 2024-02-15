import { Tooltip } from "@mui/material";

function TooltipWrapper(props) {
  const { message } = props;
  return <Tooltip title={message}>{props.children}</Tooltip>;
}

export default TooltipWrapper;
