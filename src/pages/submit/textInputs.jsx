import AddIcon from "@mui/icons-material/Add";
import ClearIcon from "@mui/icons-material/Clear";
import CloseIcon from "@mui/icons-material/Close";
import {
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  LinearProgress,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { styled } from "@mui/system";
import { useField } from "formik";
import React, { useEffect, useState } from "react";
import { HashLink } from "react-router-hash-link";

import apiProblems from "../../api/apiProblems";
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
      error={meta.touched && meta.error}
      required={required}
      helperText={meta.touched && meta.error}
    />
  );
}

// Stylings for Problem List component
const innerStyling = {
  position: "absolute",
  top: "100%",
  right: 0,
  marginTop: 0,
  maxHeight: 160,
  width: "100%",
  border: "1px solid",
  borderColor: "secondary.main",
  backgroundColor: "white",
  zIndex: 10,
  overflowY: "scroll",
  padding: 2,
};

// Styled hashlink following theme MUI theme
const StyledHashLink = styled(HashLink)(({ theme }) => ({
  color: "black",
  textDecoration: "none",
  "&:hover": {
    textDecoration: "underline",
    color: theme.palette.primary.main,
  },
}));

/**
 * Component for rendering similar open problems compared to title input.
 * @param {Array} similarProblems - Array of titles to display
 * @param {Function} setToDisplay - setState function to remove display of list.
 * @param {String} error - Error message
 */
function ProblemsList({ similarProblems, setToDisplay, error }) {
  const onClickHandler = () => {
    setToDisplay(false);
  };
  return (
    <Stack position="relative">
      <Stack sx={innerStyling}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography variant="body1" fontWeight="bold" textAlign="center">
            Similar submitted problems:
          </Typography>
          <IconButton onClick={onClickHandler} color="error">
            <CloseIcon />
          </IconButton>
        </Stack>
        <List>
          {error && (
            <Typography variant="subtitle1" color="error">
              Error from api call: {error}{" "}
            </Typography>
          )}
          {similarProblems.map((problem) => (
            <ListItem key={problem.problem_id}>
              <StyledHashLink
                smooth
                to={`/open-problems/${problem.problem_id}#title${problem.problem_id}`}
              >
                {problem.title}
              </StyledHashLink>
            </ListItem>
          ))}
        </List>
      </Stack>
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
    <Stack className="title-input-inner-box" width="100%">
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
      {formTitle.length > 0 && loading && <LinearProgress color="secondary" />}
      {formTitle.length > 0 &&
        toDisplay &&
        similarProblems.length > 0 &&
        !loading && (
          <ProblemsList
            similarProblems={similarProblems}
            setToDisplay={setToDisplay}
            error={error}
          />
        )}
    </Stack>
  );
}

/**
 * List of selected references for SelectReference component
 * @param {Function} remove - Formik remove from array function
 * @param {Array} referenceValues - Array of selected references
 */
export function ReferenceList({ remove, referenceValues }) {
  const removeHandler = (index) => {
    remove(index);
  };
  return (
    <List sx={{ width: "100%" }}>
      {referenceValues.map((reference, index) => (
        <ListItem key={`${index + 1}${reference.key}:${reference.value}`}>
          <Grid container direction="row" justifyContent="center">
            <Grid item xs={8}>
              <ListItemText primary={`${reference.type}:${reference.value}`} />
            </Grid>
            <Grid item xs={2} alignItems="center">
              <ListItemButton>
                <ListItemIcon onClick={() => removeHandler(index)}>
                  <ClearIcon color="error" />
                </ListItemIcon>
              </ListItemButton>
            </Grid>
          </Grid>
        </ListItem>
      ))}
    </List>
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
    } else {
      setFormatError("");
      setValid(true);
    }
  }, [value, identifier]);
  return (
    <Stack gap={3}>
      <Typography variant="h5" textAlign="center">
        {" "}
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
        <Grid item xs={2}>
          <FormControl fullWidth variant="filled">
            <InputLabel id="identifier">Identifier</InputLabel>
            <Select
              fullWidth
              labelId="identifier"
              id="identifier"
              label="ID type"
              name={`references.${form.values.references.length - 1}.type`}
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              error={formatError}
            >
              <MenuItem value="PMID">PMID</MenuItem>
              <MenuItem value="DOI">DOI</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={8} alignItems="center">
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
            FormHelperTextProps={{
              sx: { position: "absolute", bottom: "-20px" },
            }} // Adjust CSS as needed
          />
        </Grid>
        <Grid item alignItems="center" xs={2}>
          <IconButton color="primary" size="large" onClick={onClickHandler}>
            <AddIcon />
          </IconButton>
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
