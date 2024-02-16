import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  FilledInput,
  FormHelperText,
  FormLabel,
  IconButton,
  LinearProgress,
} from "@mui/material";
import { useField } from "formik";
import { useEffect, useState } from "react";
import { HashLink } from "react-router-hash-link";

import apiProblems from "../../../../api/apiProblems";
import useViewWidth from "../../../../utils/hooks/useViewWidth";
const boxStyles = {
  alignItems: "center",
};

const labelStyles = {
  fontSize: 18,
};

function Input({ label, name, required, field, meta }) {
  return (
    <Box sx={boxStyles}>
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

function LoadingSection() {
  return (
    <div className="w-full">
      <LinearProgress />
    </div>
  );
}

function ProblemsList({ similarProblems, setToDisplay }) {
  return (
    <div className="relative">
      {/* Wrap both TitleInput and ProblemsList in a relative container */}
      <div className="absolute top-full right-0 mt-2 max-h-40 w-full overflow-y-auto border border-theme-blue bg-white z-10">
        <div className="flex items-center">
          <h1 className="flex-grow text-small font-semibold md:text-base text-center">
            Similar submitted problems:
          </h1>
          <div className="ml-auto">
            <ExitIcon setState={setToDisplay} />
          </div>
        </div>
        <ul className="">
          {similarProblems.map((problem) => (
            <li
              key={problem.problem_id}
              className="px-2 py-1 text-sm md:text-base"
            >
              <HashLink
                smooth
                to={
                  "/open-problems/" +
                  problem.problem_id +
                  "#title" +
                  problem.problem_id
                }
                className="hover:text-theme-blue hover:underline"
              >
                {problem.title}
              </HashLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function TitleInput({ id, label, name, type, placeHolder, paddingY }) {
  const { isMobile } = useViewWidth();
  const [field, meta] = useField(name, type);

  const { value: formTitle } = meta;

  const [similarProblems, setSimilarProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
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
    <div className="w-full">
      <div className="w-full">
        <Input label="Title" name="title" field={field} meta={meta} />
        {formTitle.length > 0 && loading && <LoadingSection />}
        {formTitle.length > 0 &&
          toDisplay &&
          similarProblems.length > 0 &&
          !loading && (
            <ProblemsList
              similarProblems={similarProblems}
              setToDisplay={setToDisplay}
            />
          )}
      </div>
    </div>
  );
}

export default TitleInput;
