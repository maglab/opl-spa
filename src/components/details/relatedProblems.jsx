import { Divider, Typography } from "@mui/material";
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import CATEGORY_DATA_KEYS from "../../constants/categoryDataKeys";
import SECTION_KEYS from "../../constants/problemDetailsSectionKeys";
import { useCategory } from "../../queries/categories";
import NumberedList from "../common/numberedList";
import Referenceable from "../common/referenceable";
import StandardSection from "../common/standardSection";
import StandardStack from "../common/standardStack";
// For now open problems have one category

function RelatedProblemsList({ addScroller, openProblems, title }) {
  return (
    <Referenceable
      ref={(el) => {
        addScroller(SECTION_KEYS.relatedProblems, el);
      }}
    >
      <NumberedList
        header={`Other Problems in ${title}`}
        items={openProblems.map((problem) => ({
          key: problem.problem_id,
          item: <Typography variant="subtitle1">{problem.title}</Typography>,
          component: RouterLink,
          to: `/open-problems/${problem.problem_id}`,
        }))}
      />
    </Referenceable>
  );
}

export default function RelatedProblems({ category, addScroller }) {
  // For now there is only one category per open problem
  const title = category[0][CATEGORY_DATA_KEYS.title];
  const categoryState = useCategory(category[0][CATEGORY_DATA_KEYS.id]);
  // if (categoryState.isSuccess) {
  //   console.log(categoryState.data.data[CATEGORY_DATA_KEYS.openProblems]);
  // }
  return (
    <StandardSection header="Related Problems">
      <StandardStack minor divider={<Divider />}>
        {categoryState.isSuccess && (
          <RelatedProblemsList
            addScroller={addScroller}
            title={title}
            openProblems={
              categoryState.data.data[CATEGORY_DATA_KEYS.openProblems]
            }
          />
        )}
      </StandardStack>
    </StandardSection>
  );
}
