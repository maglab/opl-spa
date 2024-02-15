import IndeterminateCheckBoxIcon from "@mui/icons-material/IndeterminateCheckBox";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { Button, Collapse } from "@mui/material";

import { useState } from "react";

function InterfaceTemplate(props) {
  const { title } = props;

  // States for button
  const [openSection, setOpenSection] = useState(true);
  const onClickHandler = () => {
    setOpenSection(!openSection);
  };
  return (
    <div className="classification mt-8 w-full border border-gray-100 bg-white px-8 py-2 shadow-lg ">
      <div className="header flex flex-row">
        <h1 className="py-2 text-lg text-theme-blue md:text-2xl">{title}</h1>
        <Button onClick={onClickHandler}>
          {openSection ? <IndeterminateCheckBoxIcon /> : <AddBoxIcon />}
        </Button>
      </div>
      <hr className="py-2" />
      <div className="h-max">
        <Collapse in={openSection} timeout="auto" unmountOnExit>
          {props.children}
        </Collapse>
      </div>
    </div>
  );
}

export default InterfaceTemplate;
