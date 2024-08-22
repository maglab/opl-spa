import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Box, Chip, Grid, IconButton, MenuItem } from "@mui/material";
import {
  blue,
  brown,
  green,
  grey,
  orange,
  purple,
  teal,
} from "@mui/material/colors";
import { Form, Formik } from "formik";
import { original as ori } from "immer";
import { capitalize, isEqual } from "lodash";
import React, { useContext, useMemo } from "react";
import SEARCH_SUBJECT_KEYS from "../../constants/problemQuerySubjectKeys";
import QueryParamsContext from "../../contexts/queryParamsContext";
import useExtendedTheme from "../../theme/useExtendedTheme";
import FormManagedTextField from "../common/formManagedTextField";
import StandardGrid from "../common/standardGrid";
import StandardStack from "../common/standardStack";
import { objectToQueryParam, queryParamToObject } from "./queryFormat";

const initialValues = { subject: SEARCH_SUBJECT_KEYS.title, text: "" };
const criteriaColors = {
  [SEARCH_SUBJECT_KEYS.title]: grey[200],
  [SEARCH_SUBJECT_KEYS.gene]: blue[200],
  [SEARCH_SUBJECT_KEYS.reference]: brown[200],
  [SEARCH_SUBJECT_KEYS.author]: purple[200],
  [SEARCH_SUBJECT_KEYS.tag]: green[200],
  [SEARCH_SUBJECT_KEYS.species]: orange[200],
  [SEARCH_SUBJECT_KEYS.compound]: teal[200],
};

export default function Search() {
  const theme = useExtendedTheme();
  const { queryParams, editQueryParams } = useContext(QueryParamsContext);
  const criteria = useMemo(
    () => (queryParams.search ?? []).map(queryParamToObject),
    [queryParams]
  );

  const onSubmitHandler = (values, actions) => {
    if (values.text !== "" && !criteria.some((c) => isEqual(c, values))) {
      editQueryParams((draft) => {
        const param = objectToQueryParam(values);
        const original = ori(draft);
        if (Array.isArray(original.search)) draft.search.push(param);
        else draft.search = [param];
      });
    }
    actions.setFieldValue("text", "");
  };

  const onDeleteClicked = (criterion) => {
    editQueryParams((draft) => {
      const param = objectToQueryParam(criterion);
      const original = ori(draft);
      const index = original.search?.findIndex?.((i) => i === param) ?? -1;
      if (index !== -1) draft.search.splice(index, 1);
    });
  };

  return (
    <StandardStack minor>
      <Formik initialValues={initialValues} onSubmit={onSubmitHandler}>
        <Form>
          <StandardStack minor direction="row" alignItems="center">
            <Box width={theme.layout.selectWidth(2)}>
              <FormManagedTextField select name="subject" label="Subject">
                {Object.values(SEARCH_SUBJECT_KEYS).map((key) => (
                  <MenuItem key={key} value={key}>
                    {key}
                  </MenuItem>
                ))}
              </FormManagedTextField>
            </Box>
            <FormManagedTextField name="text" fullWidth />
            <IconButton type="submit">
              <AddCircleIcon fontSize="large" color="primary" />
            </IconButton>
          </StandardStack>
        </Form>
      </Formik>
      {criteria.length ? (
        <StandardGrid minor direction="row">
          {criteria.map((criterion) => (
            <Grid item xs="auto" key={`${criterion.subject}:${criterion.text}`}>
              <Chip
                sx={{ bgcolor: criteriaColors[criterion.subject] }}
                label={`${capitalize(criterion.subject)} | ${criterion.text}`}
                onDelete={() => onDeleteClicked(criterion)}
              />
            </Grid>
          ))}
        </StandardGrid>
      ) : null}
    </StandardStack>
  );
}
