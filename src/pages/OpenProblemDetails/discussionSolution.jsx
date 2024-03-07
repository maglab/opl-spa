import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Grid, Paper, Tab, Typography } from "@mui/material";
import React, { useState } from "react";

function DiscussionSection() {
  return (
    <TabPanel>
      <Typography>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam harum
        doloribus ex autem veniam? Recusandae minus quos quia perspiciatis
        consequuntur deleniti possimus voluptas tempore quod odit fuga sapiente,
        ullam numquam!
      </Typography>
    </TabPanel>
  );
}

export default function DiscussionSolution() {
  const [tabState, setTabState] = useState(1);
  const handleChange = (event, newValue) => {
    console.log("test");
    setTabState(newValue);
  };
  return (
    <Paper>
      <Grid container>
        <Grid item xs={12} typography="h1">
          <TabContext value={tabState}>
            <TabList onChange={handleChange} centered>
              <Tab label="DISCUSSION" value={1} />
              <Tab label="SOLUTIONS" value={2} />
            </TabList>
          </TabContext>
        </Grid>
      </Grid>
    </Paper>
  );
}
