import { List } from "@mui/material";
import { useSelector } from "react-redux";
import MuiListComponent from "./MuiListComponent";
import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";

function MuiList() {
  const selectedSorting = useSelector(
    (state) => state.question.filters.sorting
  );
  const allProblems = useLoaderData();
  const [selectedProblems, setSelectedProblems] = useState(allProblems.top);

  useEffect(() => {
    switch (selectedSorting) {
      case "top":
        setSelectedProblems(allProblems.top);
        break;
      case "latest":
        setSelectedProblems(allProblems.latest);
        break;
      case "answered":
        setSelectedProblems(allProblems.answered);
        break;
      case "root":
        setSelectedProblems(allProblems.root);
        break;

      default:
        setSelectedProblems(allProblems.top);
    }
  }, [selectedSorting]);

  // const data = children || problems; // Use children if it exists, otherwise use problems;

  return (
    <List sx={{ width: "100%"}} variant="outlined">
      {selectedProblems &&
        selectedProblems.map((item, index) => (
          <MuiListComponent key={index} title={item.title} problem={item} />
        ))}
    </List>
  );
}

export default MuiList;
