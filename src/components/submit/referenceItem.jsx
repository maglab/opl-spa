import DeleteIcon from "@mui/icons-material/Delete";
import {
  Box,
  Grid,
  IconButton,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import { useField } from "formik";
import _ from "lodash";
import React, { useState } from "react";
import { useAsync, useDebounce } from "react-use";
import apiReferences from "../../api/apiReferences";
import REFERENCE_TYPE_KEYS from "../../constants/referenceTypes";
import FormManagedTextField from "../formManagedTextField";

export default function ReferenceItem({ index, remove }) {
  const [field, fieldMeta, { setValue }] = useField(`references[${index}]`);
  const [debouncedValues, setDebouncedValues] = useState({ valid: false });

  const fetchReferenceInfoState = useAsync(async () => {
    const { type, value } = debouncedValues;
    if (!type || !value) return null;

    const response = await apiReferences.verifyReference({ type, value });
    const { data } = response;
    if (!data) throw new Error();
    setValue({ ...debouncedValues, data });
    return data;
  }, [debouncedValues]);

  useDebounce(
    () => {
      const values = {
        type: fieldMeta.error ? null : field.value.type,
        value: fieldMeta.error ? null : field.value.value,
      };

      // Formik has a weird behaviour that all rerendering causes field values update event
      // The comparison is to prevent infinite loop
      if (!_.isEqual(debouncedValues, values)) setDebouncedValues(values);
    },
    500,
    [field]
  );

  return (
    <Stack>
      <Box>
        <Grid
          container
          direction="row"
          alignItems="flex-start"
          columnSpacing={1}
        >
          <Grid item xs="auto">
            <IconButton color="error" onClick={() => remove(index)}>
              <DeleteIcon />
            </IconButton>
          </Grid>

          <Grid item xs={2}>
            <FormManagedTextField
              name={`references[${index}].type`}
              label="Type"
              select
              size="small"
            >
              {[Object.values(REFERENCE_TYPE_KEYS)].map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </FormManagedTextField>
          </Grid>
          <Grid item xs>
            <FormManagedTextField
              name={`references[${index}].value`}
              label="Identifier"
              size="small"
            />
          </Grid>
        </Grid>
      </Box>
      <Typography>
        {fetchReferenceInfoState.error
          ? "Couldn't fetch reference information from databases, are you sure the reference is correct?"
          : fetchReferenceInfoState?.value?.title ?? ""}
      </Typography>
    </Stack>
  );
}
