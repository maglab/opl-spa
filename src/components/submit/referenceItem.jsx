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
import ManagedTextField from "./managedTextField";

export default function ReferenceItem({ index, remove }) {
  const [field, fieldMeta] = useField(`references[${index}]`);
  const [debouncedValues, setDebouncedValues] = useState({ valid: false });
  const fetchReferenceInfoState = useAsync(async () => {
    const { type, value } = debouncedValues;
    if (!type || !value) return null;

    const response = await apiReferences.verifyReference({ type, value });
    const { data } = response;
    if (!data) throw new Error();
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
            <ManagedTextField
              name={`references[${index}].type`}
              label="Type"
              select
              size="small"
            >
              {["PMID", "DOI"].map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </ManagedTextField>
          </Grid>
          <Grid item xs>
            <ManagedTextField
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
