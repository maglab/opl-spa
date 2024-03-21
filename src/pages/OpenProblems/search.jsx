import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Chip, Grid, IconButton, MenuItem } from "@mui/material";
import { blue, brown, grey, purple } from "@mui/material/colors";
import { Form, Formik } from "formik";
import { original as ori } from "immer";
import { capitalize, isEqual } from "lodash";
import React, { useContext, useMemo } from "react";
import StandardGrid from "../../components/common/standardGrid";
import StandardStack from "../../components/common/standardStack";
import FormManagedTextField from "../../components/formManagedTextField";
import SEARCH_SUBJECT_KEYS from "../../constants/problemQuerySubjectKeys";
import QueryParamsContext from "../../contexts/queryParamsContext";
import useExtendedTheme from "../../theme/useExtendedTheme";

const initialValues = { subject: SEARCH_SUBJECT_KEYS.title, text: "" };
const criteriaColors = {
  [SEARCH_SUBJECT_KEYS.title]: grey[200],
  [SEARCH_SUBJECT_KEYS.gene]: blue[200],
  [SEARCH_SUBJECT_KEYS.reference]: brown[200],
  [SEARCH_SUBJECT_KEYS.author]: purple[200],
};

const queryParamToObject = (param) => {
  const sepIndex = param.indexOf(":");
  return {
    subject: param.substring(0, sepIndex),
    text: param.substring(sepIndex + 1),
  };
};

const objectToQueryParam = (obj) => `${obj.subject}:${obj.text}`;

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
    <StandardStack minor p={0}>
      <Formik initialValues={initialValues} onSubmit={onSubmitHandler}>
        <Form>
          <StandardStack minor p={0} direction="row" alignItems="center">
            <FormManagedTextField
              select
              name="subject"
              label="Subject"
              sx={{ minWidth: theme.layout.selectWidth() }}
            >
              {Object.values(SEARCH_SUBJECT_KEYS).map((key) => (
                <MenuItem key={key} value={key}>
                  {capitalize(key)}
                </MenuItem>
              ))}
            </FormManagedTextField>
            <FormManagedTextField name="text" fullWidth />
            <IconButton type="submit">
              <AddCircleIcon fontSize="large" color="primary" />
            </IconButton>
          </StandardStack>
        </Form>
      </Formik>
      {criteria.length ? (
        <StandardGrid minor direction="row" p={0}>
          {criteria.map((criterion) => (
            <Grid item xs="auto" key={`${criterion.subject}:${criterion.text}`}>
              <Chip
                sx={{ backgroundColor: criteriaColors[criterion.subject] }}
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
