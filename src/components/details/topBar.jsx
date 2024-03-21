import { AppBar, Button, Stack, Toolbar } from "@mui/material";
import React from "react";

function TopBarButton({ children, componentRef }) {
  const handleClick = () => {
    if (componentRef.current) {
      componentRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <Button color="inherit" variant="outlined" onClick={handleClick}>
      {children}
    </Button>
  );
}

export default function TopBar({ refs }) {
  // We use the refs to set where to scroll to.
  const { detailsRef, solutionsRef, relatedProblemsRef } = refs;

  return (
    <AppBar position="static" sx={{ flexGrow: 1, width: "100%" }}>
      <Toolbar>
        <Stack
          spacing={2}
          direction="row"
          justifyContent="space-evenly"
          width="100%"
        >
          <TopBarButton componentRef={detailsRef}>Details</TopBarButton>
          <TopBarButton componentRef={solutionsRef}>
            Solutions/Discussions
          </TopBarButton>
          <TopBarButton componentRef={relatedProblemsRef}>
            Related Open Problems
          </TopBarButton>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
