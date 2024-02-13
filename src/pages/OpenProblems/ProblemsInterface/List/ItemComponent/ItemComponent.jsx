import { useState } from "react";
import { HashLink } from "react-router-hash-link";
import { Collapse } from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";

import ListAccordionContent from "../../Accordion/ListAccordionContent";
import ChipSection from "./ChipSection";

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
        <div className="w-full flex flex-row justify-between items-center text-left">
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
          <ChipSection id={id} />
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
