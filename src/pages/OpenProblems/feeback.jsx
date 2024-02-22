import React, { useMemo } from "react";
import {
  Dialog,
  Paper,
  Typography,
  Stack,
  Select,
  MenuItem,
  TextField,
  FormControl,
  InputLabel,
  Button,
  FormHelperText,
  Autocomplete,
} from "@mui/material";
import { Formik, Form, useField } from "formik";
import useGetApi from "../../utils/hooks/useApi";
import apiProblems from "../../api/apiProblems";

const initialValues = {
  id: "",
  reason: "",
  information: "",
  duplicate: null,
};

/**
 * Formik validation function
 * @param {Object} values - Form values passed by formik
 * @param {Object} props - Props passed by Formik
 * @returns {Object}
 */
const validation = (values, props) => {
  const errors = {};

  //Must be a reason
  if (!values.reason) {
    errors.reason = "Please select reason";
  }
  //Other must have additional information
  if (values.reason === "other" && !values.information.trim()) {
    errors.information =
      "Please enter additional information if choosing other.";
  }
  //Duplicate must be selected if duplicate reason chosen
  if (values.reason === "duplicate" && !values.duplicate) {
    errors.duplicate = "Duplicate problem must be selected";
  }
  return errors;
};

/**
 * Formik submit function
 * @param {Object} values
 * @param {Object} props
 */
function submit(values, props) {
  console.log(values);
}

function SelectDuplicate({ formik }) {
  const [field, meta, helpers] = useField("duplicate");
  const handleChange = (_, value) => {
    helpers.setValue(value);
    helpers.setTouched(true);
  };
  const { apiData: data, isLoading } = useGetApi(
    apiProblems.getAllProblems,
    {},
    []
  );
  const openProblemsOptions = useMemo(() => {
    if (!data) return [];
    return data.map((openProblem) => ({
      label: openProblem.title,
      id: openProblem.problem_id,
    }));
  }, [data]);

  return (
    <Autocomplete
      selectOnFocus
      clearOnBlur
      onChange={handleChange}
      name="duplicate"
      loading={isLoading}
      loadingText="Loading..."
      options={openProblemsOptions}
      isOptionEqualToValue={(option, value) => option.label === value.label}
      renderInput={(params) => (
        <TextField
          {...params}
          {...field}
          label="What is this a duplicate of?"
          variant="filled"
          error={Boolean(meta.error)}
          helperText={meta.touched && meta.error}
        />
      )}
    />
  );
}

function FeedbackForm({ id, open, onClose }) {
  return (
    <Dialog onClose={onClose} open={open} maxWidth="sm">
      <Paper>
        <Formik
          initialValues={{ ...initialValues, id: id }}
          validate={validation}
          onSubmit={submit}
        >
          {(formik) => (
            <Form>
              <Stack spacing={2.5} padding={2}>
                <Typography variant="h5"> Report </Typography>
                <Typography variant="body1">
                  Select a reason for the report and add additional information
                  if necessary.
                </Typography>
                <FormControl variant="filled">
                  <InputLabel id="reason"> Reason </InputLabel>
                  <Select
                    labelId="reason"
                    name="reason"
                    {...formik.getFieldProps("reason")}
                    error={formik.touched.reason && formik.errors.reason}
                    value={formik.values.reason}
                  >
                    <MenuItem value="duplicate"> Duplicate </MenuItem>
                    <MenuItem value="other">Other</MenuItem>
                  </Select>
                  <FormHelperText>
                    {formik.touched.reason && formik.errors.reason}
                  </FormHelperText>
                </FormControl>
                {formik.values.reason === "duplicate" && (
                  <SelectDuplicate formik={formik} />
                )}

                <TextField
                  multiline
                  minRows={3}
                  variant="filled"
                  label="Additional information"
                  name="information"
                  {...formik.getFieldProps("information")}
                  error={
                    formik.touched.information &&
                    Boolean(formik.errors.information)
                  }
                  helperText={
                    formik.touched.information && formik.errors.information
                  }
                  value={formik.values.information}
                />
                <Stack
                  direction="row"
                  display="flex"
                  justifyContent="center"
                  spacing={2}
                >
                  <Button variant="outlined" color="primary" onClick={onClose}>
                    Exit
                  </Button>
                  <Button variant="contained" type="submit">
                    Submit
                  </Button>
                </Stack>
              </Stack>
            </Form>
          )}
        </Formik>
      </Paper>
    </Dialog>
  );
}

export default FeedbackForm;
