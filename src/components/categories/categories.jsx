import {
  List,
  ListItemButton,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

import CATEGORY_DATA_KEYS from "../../constants/categoryDataKeys";
import OPEN_PROBLEM_KEYS from "../../constants/problemDataKeys";
import { useCategories } from "../../queries/categories";
import StandardSection from "../common/standardSection";
import StandardStack from "../common/standardStack";

function CategoryError() {
  return (
    <StandardStack>
      <Typography>Unable to load categories page.</Typography>
    </StandardStack>
  );
}

function CategoryHeader() {
  return (
    <Paper>
      <StandardStack direction="column" main p>
        <Typography variant="h4">Browse Open Problems by Category </Typography>
      </StandardStack>
    </Paper>
  );
}

function CategoriesList({ category }) {
  const { title, open_problems: openProblems } = category;
  return (
    <StandardSection header={title} isOpen={false}>
      <List>
        {openProblems &&
          openProblems.map((openProblem) => (
            <ListItemButton
              component={Link}
              to={`/open-problems/${openProblem[OPEN_PROBLEM_KEYS.id]}`}
              key={openProblem.id}
            >
              <ListItemText primary={openProblem[OPEN_PROBLEM_KEYS.title]} />
            </ListItemButton>
          ))}
      </List>
    </StandardSection>
  );
}

function Categories() {
  const categoriesState = useCategories();

  if (categoriesState.isError) {
    return <CategoryError />;
  }

  return (
    <StandardStack minor p>
      <CategoryHeader />

      <Paper>
        {categoriesState.isSuccess &&
          categoriesState.data.data.map((category) => (
            <CategoriesList
              category={category}
              key={category[CATEGORY_DATA_KEYS.id]}
            />
          ))}
      </Paper>
    </StandardStack>
  );
}

export default Categories;
