import Chip from "../../../../../components/UI/Chip/Chip";
import ListAccordionContent from "../../Accordion/ListAccordionContent";

import { useState } from "react";
import { HashLink } from "react-router-hash-link";
import { Collapse } from "@mui/material";
import { ExpandLess } from "@mui/icons-material";
import { ExpandMore } from "@mui/icons-material";

function ItemComponent({ openProblem }) {
  const { problem_id: id, title } = openProblem;

  const [isExpanded, setExpanded] = useState(false);

  const onClickHandler = () => {
    setExpanded((prev) => !prev);
  };

  const preventClickPropagation = (e) => {
    e.stopPropagation();
  };

  return (
    <li className="problems-list" key={id}>
      <button
        onClick={onClickHandler}
        className="bg-white p-2 px-4 space-y-4 shadow-md w-full hover:bg-gray-200"
      >
        <div className="w-full flex flex-row justify-between items-center">
          <span
            onClick={preventClickPropagation}
            className="title hover:text-theme-blue hover:underline"
          >
            <HashLink to={`./${id}#nav`}>
              <h1>{title}</h1>
            </HashLink>
          </span>
          <span>{isExpanded ? <ExpandLess /> : <ExpandMore />}</span>
        </div>
        <div
          onClick={preventClickPropagation}
          className="chips flex flex-row w-full space-x-3"
        >
          <Chip>Testing Chip</Chip>
          <Chip>Testing Chip</Chip>
          <Chip>Testing Chip</Chip>
          <Chip>Small</Chip>
          <Chip>Really long chip</Chip>
        </div>
      </button>
      <div className="accordion border-l border-theme-blue">
        <Collapse
          in={isExpanded}
          timeout="auto"
          unmountOnExit
          sx={{ px: "2rem" }}
        >
          <ListAccordionContent openProblem={openProblem} />
        </Collapse>
      </div>
    </li>
  );
}

export default ItemComponent;
