import { Container } from "@mui/material";
import React from "react";
import config from "../../utils/configs/SideNavConfig";
import Filter from "./Filter/Filter";
import ProblemsInterface from "./ProblemsInterface/ProblemsInterface";
import SearchBar from "./SearchBar/SearchBar";
import Statbar from "./Statbar/Statbar";

function OpenProblems() {
  return (
    <Container>
      <div className="w-full flex flex-row pt-6">
        <div className="side-nav w-1/5 sticky">
          <Filter config={config} />
        </div>
        {/* Main Content */}
        <div className="main w-full h-max overflow-auto">
          <SearchBar label="Search for an open problem" />
          <Statbar className="statbar" />
          <ProblemsInterface />
        </div>
      </div>
    </Container>
  );
}

export default OpenProblems;
