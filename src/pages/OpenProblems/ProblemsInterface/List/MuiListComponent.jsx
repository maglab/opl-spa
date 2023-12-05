import { Collapse, ListItemButton, ListItemText } from "@mui/material";
import { useState } from "react";
import { ExpandLess } from "@mui/icons-material";
import { ExpandMore } from "@mui/icons-material";
import ListItemContent from "./ListItemContent";
import ListAccordionContent from "../Accordion/ListAccordionContent";
import { HashLink } from "react-router-hash-link";
function MuiListComponent(props) {
  const problem = props.problem;
  const { problem_id: id, description, children } = problem;
  const [isExpanded, setExpanded] = useState(false);
  const onClickHandler = () => {
    if (children || description) {
      setExpanded(!isExpanded);
    }
  };

  return (
    <li key={id}>
      <ListItemButton
        className="w-100 my-2 flex bg-white"
        onClick={onClickHandler}
        sx={{
          width: "100%",
          bgcolor: "white",
          display: "flex",
          justifyContent: "space-between",
          px: "2rem",
          cursor: children || description ? "pointer" : "default", // Add cursor pointer if clickable
        }}
      >
        <ListItemContent>
          <HashLink to={`./${id}#nav`}>
            <ListItemText
              className=" hover:text-theme-blue hover:underline text-sm md:text-sm"
              primary={problem.title}
            />
          </HashLink>
        </ListItemContent>
        {(children.length > 0 || description) && isExpanded ? (
          <ExpandLess />
        ) : (
          <ExpandMore />
        )}
      </ListItemButton>
      <div className=" border-l border-dashed border-theme-blue ">
        <Collapse
          in={isExpanded}
          timeout="auto"
          unmountOnExit
          sx={{ px: "2rem" }}
        >
          <ListAccordionContent problem={problem} />
        </Collapse>
      </div>
    </li>
  );
}

export default MuiListComponent;
