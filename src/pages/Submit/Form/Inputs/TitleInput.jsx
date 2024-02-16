import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  FilledInput,
  FormHelperText,
  FormLabel,
  IconButton,
  LinearProgress,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import { styled } from "@mui/system";
import { useField } from "formik";
import { useEffect, useState } from "react";
import { HashLink } from "react-router-hash-link";

import apiProblems from "../../../../api/apiProblems";

const labelStyles = {
  fontSize: 18,
};
/**
 * Input for title
 * @param {String} label - Label text
 * @param {String} name - name required for Formik useField hook
 * @param {Boolean} required
 * @param {Object} field - Formik field object
 * @param {Object} meta - Formik meta object
 * @returns
 */
function Input({ label, name, required, field, meta }) {
  return (
    <Box alignItems="center">
      <FormLabel sx={labelStyles}>{label}</FormLabel>
      <FilledInput
        fullWidth={true}
        name={name}
        onChange={field.onChange}
        onBlur={field.onBlur}
        error={meta.touched && Boolean(meta.error)}
        required={required}
      />
      <FormHelperText>{meta.error}</FormHelperText>
    </Box>
  );
}

function ExitIcon({ setState }) {
  const onClickHandler = () => {
    setState(false);
  };
  return (
    <IconButton onClick={onClickHandler} size="medium" style={{ color: "red" }}>
      <CloseIcon fontSize="medium" />
    </IconButton>
  );
}

// Stylings for Problem List components
const innerBoxStyling = {
  position: "absolute",
  top: "100%",
  right: 0,
  marginTop: 0,
  maxHeight: 160,
  width: "100%",
  border: "1px solid",
  borderColor: "secondary.main",
  backgroundColor: "primary.main",
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
    color: theme.palette.secondary.main,
  },
}));

/**
 * Component for rendering similar open problems compared to title input.
 * @param {Array} similarProblems - Array of titles to display
 * @param {Function} setToDisplay - setState function to remove display of list.
 * @returns
 */
function ProblemsList({ similarProblems, setToDisplay }) {
  return (
    <Box position="relative">
      <Box sx={innerBoxStyling}>
        <Box display="flex" alignItems="center">
          <Typography
            display="flex"
            variant="body1"
            fontWeight="bold"
            textAlign="center"
          >
            Similar submitted problems:
          </Typography>
          <Box marginLeft="auto">
            <ExitIcon setState={setToDisplay} />
          </Box>
        </Box>
        <List className="">
          {similarProblems.map((problem) => (
            <ListItem key={problem.problem_id}>
              <StyledHashLink
                smooth
                to={
                  "/open-problems/" +
                  problem.problem_id +
                  "#title" +
                  problem.problem_id
                }
              >
                {problem.title}
              </StyledHashLink>
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );
}

export function TitleInput({ name, type }) {
  const [field, meta] = useField(name, type);
  const { value: formTitle } = meta;

  const [similarProblems, setSimilarProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false); //No error reporting for now
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
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    }

    const timer = setTimeout(() => {
      searchProblems(formTitle);
    }, 1500);
    return () => clearTimeout(timer);
  }, [formTitle]);

  return (
    <Box className="title-input-outer-box" width="100%">
      <Box className="title-input-inner-box" width="100%">
        <Input label="Title" name="title" field={field} meta={meta} />
        {formTitle.length > 0 && loading && (
          <LinearProgress color="secondary" />
        )}
        {formTitle.length > 0 &&
          toDisplay &&
          similarProblems.length > 0 &&
          !loading && (
            <ProblemsList
              similarProblems={similarProblems}
              setToDisplay={setToDisplay}
            />
          )}
      </Box>
    </Box>
  );
}
