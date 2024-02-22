import { List, Grid, Typography } from "@mui/material";
import MuiListComponent from "../List/MuiListComponent";
import ButtonGroupComponent from "../ButtonGroup/ButtonGroupComponent";
function ListAccordionContent(props) {
  const problem = props.problem;
  const children = problem.children;
  const parent = problem.parent_problem;
  const isRoot = parent ? true : false;

  return (
    <Grid container direction="column" spacing={2} p={2}>
      <Grid item xs={12}>
        <Typography variant="body1">
          {problem.description && problem.description}
        </Typography>
      </Grid>
      <Grid
        item
        xs={12}
        justifyContent="center"
        alignItems="center"
        display="flex"
      >
        <ButtonGroupComponent problem={problem} isRoot={isRoot} />
      </Grid>
      <Grid item className="problems">
        <Typography variant="h5">Connected Open Problems</Typography>
        {children.length > 0 ? (
          <List sx={{ width: "100%" }} variant="outlined">
            {children.map((item, index) => (
              <MuiListComponent key={index} title={item.title} problem={item} />
            ))}
          </List>
        ) : (
          <Typography variant="subtitle1">None</Typography>
        )}
      </Grid>
    </Grid>
  );
}

export default ListAccordionContent;
