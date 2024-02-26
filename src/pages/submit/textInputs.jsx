import AddIcon from "@mui/icons-material/Add";
import ClearIcon from "@mui/icons-material/Clear";
import {
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  LinearProgress,
  Link,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useField } from "formik";
import React, { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";

import apiProblems from "../../api/apiProblems";
import apiReferences from "../../api/apiReferences";
import regexTest from "./functions/referenceRegex";
/**
 * Reusable text field using the Formik useField hook.
 * @param {String} id - id text
 * @param {String} name - Name required for formik
 * @param {String} label - Label text
 * @param {String} placeholder - Placeholder text
 * @param {Boolean} multiline - For text area
 * @param {Number} rows - Sets minimum rows
 * @param {String} type - Change type of MUI field
 */
export function TextInput({
  id,
  name,
  label,
  placeholder,
  multiline,
  rows,
  required,
  type,
}) {
  const [field, meta] = useField(name);
  return (
    <TextField
      id={id}
      placeholder={placeholder}
      label={label}
      variant="filled"
      fullWidth
      multiline={multiline}
      minRows={rows}
      type={type}
      onChange={field.onChange}
      onBlur={field.onBlur}
      error={meta.touched && Boolean(meta.error)}
      required={required}
      helperText={meta.touched && meta.error}
    />
  );
}

/**
 * List of similar probelems
 * @param {Array} similarProblems
 * @returns {React.Component}
 */
function SimilarProblems({ similarProblems, error }) {
  if (error) {
    return (
      <Stack textAlign="center">
        <Typography variant="subtitle1">
          Error sending request to API: {error}
        </Typography>{" "}
      </Stack>
    );
  }
  return (
    <Stack spacing={2} padding={2}>
      <Typography variant="h7" sx={{ textDecoration: "underline" }}>
        Are you submitting the same problem?
      </Typography>
      <List disablePadding>
        {similarProblems.map((openProblem) => (
          <ListItem key={openProblem.problem_id}>
            <Link
              component={RouterLink}
              to={`open-problems/${openProblem.problem_id}`}
            >
              {openProblem.title}
            </Link>
          </ListItem>
        ))}
      </List>
    </Stack>
  );
}

/**
 * Title input for form
 * @param {String} - Name of input required for formik
 * @param {String} - Type used for formik
 */
export function TitleInput({ name, type }) {
  const [field, meta] = useField(name, type);
  const { value: formTitle } = meta;

  const [similarProblems, setSimilarProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false); // No error reporting for now
  const [toDisplay, setToDisplay] = useState(false);

  useEffect(() => {
    setLoading(true);
    async function searchProblems(searchQuery) {
      try {
        const queryParams = { search: searchQuery };
        const response = await apiProblems.getProblems({ queryParams });
        setSimilarProblems(response.data.results);
        setLoading(false);
        setToDisplay(true);
      } catch (e) {
        setError(e.message);
        setLoading(false);
      }
    }

    const timer = setTimeout(() => {
      searchProblems(formTitle);
    }, 1500);
    return () => clearTimeout(timer);
  }, [formTitle]);

  return (
    <Stack className="title-input-inner-box" width="100%" spacing={2}>
      <Stack>
        <TextField
          id="title"
          label="Title"
          name="title"
          variant="filled"
          onChange={field.onChange}
          onBlur={field.onBlur}
          error={meta.touched && Boolean(meta.error)}
          helperText={meta.touched && meta.error}
        />
        {formTitle.length > 0 && loading && (
          <LinearProgress color="secondary" />
        )}
      </Stack>

      {formTitle.length > 0 &&
        toDisplay &&
        similarProblems.length > 0 &&
        !loading && (
          <SimilarProblems similarProblems={similarProblems} error={error} />
        )}
    </Stack>
  );
}

function ReferenceListItem({ reference, index, removeHandler, form }) {
  const { type, value } = reference;
  const [referenceInformation, setReferenceInformation] = useState("");
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState(false);

  useEffect(() => {
    setLoading(true);
    async function getReferenceInformation() {
      try {
        const response = await apiReferences.verifyReference({ type, value });
        setReferenceInformation(response.data);
        form.setFieldValue(
          `references[${index}].reference_information`,
          response.data
        );
      } catch (error) {
        setApiError(error);
      } finally {
        setLoading(false);
      }
    }
    getReferenceInformation();
  }, []);
  if (loading) {
    return (
      <Stack padding={2}>
        <LinearProgress color="primary" />
      </Stack>
    );
  }
  return (
    <ListItem
      key={`${index + 1}${type}:${value}`}
      secondaryAction={
        <IconButton edge="end" color="error" onClick={removeHandler}>
          <ClearIcon />
        </IconButton>
      }
    >
      <ListItemText
        primary={apiError || referenceInformation.title}
        secondary={`${type}:${value}`}
      />
    </ListItem>
  );
}

/**
 * List of selected references for SelectReference component
 * @param {Function} remove - Formik remove from array function
 * @param {Array} referenceValues - Array of selected references
 */
export function ReferenceList({ remove, referenceValues, form }) {
  const removeHandler = (index) => {
    remove(index);
  };

  return (
    <Stack>
      <List sx={{ width: "100%" }} disablePadding>
        {referenceValues.map((reference, index) => (
          <ReferenceListItem
            index={index}
            reference={reference}
            removeHandler={removeHandler}
            form={form}
          />
        ))}
      </List>
    </Stack>
  );
}

/**
 * Select reference component for form
 * @param {Function} push - Formik push to array function
 * @param {Function} remove - Formik remove from array function
 * @param {Object} form - Formik form object containing form values and form methods.
 */
export function SelectReference({ push, remove, form }) {
  const [identifier, setIdentifier] = useState("");
  const [valueTouched, setValueTouched] = useState("");
  const [value, setValue] = useState("");
  const [formatError, setFormatError] = useState("");
  const [valid, setValid] = useState(false);
  const onClickHandler = () => {
    if (valid) {
      push({ type: identifier, value });
    }
  };

  useEffect(() => {
    if (!valueTouched || value.trim().length === 0) return;
    if (!regexTest(`${identifier}:${value}`)) {
      setFormatError("Incorrect PMID/DOI format");
      setValid(false);
      return;
    }
    if (`${identifier}:${value}` in form.values.references) {
      setFormatError("Cannot input the same PMID/DOI");
      return;
    }
    setFormatError("");
    setValid(true);
  }, [value, identifier]);
  return (
    <Stack gap={3}>
      <Typography variant="h5" textAlign="center">
        Add references
      </Typography>
      <Grid
        container
        direction="row"
        alignItems="center"
        spacing={1}
        justifyItems="center"
        minHeight={12}
      >
        <Grid
          item
          container
          xs={12}
          justifyContent="space-between"
          alignItems="flex-start"
          spacing={2}
        >
          <Grid item xs={12} md={2} justifyContent="center" alignItems="center">
            <Stack direction="row">
              <FormControl variant="filled" fullWidth>
                <InputLabel id="identifier">Identifier</InputLabel>
                <Select
                  labelId="identifier"
                  id="identifier"
                  label="ID type"
                  name={`references.${form.values.references.length - 1}.type`}
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  error={Boolean(formatError)}
                >
                  <MenuItem value="PMID">PMID</MenuItem>
                  <MenuItem value="DOI">DOI</MenuItem>
                </Select>
              </FormControl>
            </Stack>
          </Grid>
          <Grid item xs={12} md={10}>
            <TextField
              fullWidth
              variant="filled"
              label="Identifier value"
              name={`references.${form.values.references.length - 1}.value`}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onBlur={() => setValueTouched(true)}
              error={Boolean(formatError)}
              helperText={formatError}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton color="primary" onClick={onClickHandler}>
                      <AddIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid container direction="column">
        <Grid item xs={12}>
          <ReferenceList
            remove={remove}
            form={form}
            referenceValues={form.values.references}
          />
        </Grid>
      </Grid>
    </Stack>
  );
}
