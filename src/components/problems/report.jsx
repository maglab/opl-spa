import CheckIcon from "@mui/icons-material/Check";
import {
  Alert,
  Button,
  Card,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
} from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { useField } from "formik";
import React from "react";
import { reportProblem } from "../../apiNew/apiReport";
import { openProblemReport } from "../../constants/reportMappings";
import FormManagedTextField from "../common/formManagedTextField";
import ReportFormManager from "./reportFormManager";

function SelectSubject({ name, children }) {
  const [field, meta] = useField(name);
  return (
    <Select
      name={field.name}
      onChange={field.onChange}
      onBlur={field.onBlur}
      error={Boolean(meta.error)}
      value={field.value}
    >
      {children}
    </Select>
  );
}

export default function ReportForm({ setOpen, open }) {
  const { mutate, isSuccess } = useMutation({
    mutationFn: (postData) => reportProblem(postData),
  });
  const onSubmitHandler = (value, props) => {
    mutate(value);
    if (isSuccess) {
      props.resetForm();
    }
  };
  return (
    <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
      <Card>
        {isSuccess && (
          <Alert icon={<CheckIcon />} severity="success">
            Report sent
          </Alert>
        )}
        <ReportFormManager onSubmit={onSubmitHandler}>
          <DialogTitle> Report a problem </DialogTitle>
          <DialogContent>
            <Stack spacing={2} direction="column">
              <DialogContentText>
                Select a reason and add additional information if necessary
              </DialogContentText>
              <FormControl variant="filled">
                <InputLabel> Reason</InputLabel>
                <SelectSubject name="subject">
                  <MenuItem value={openProblemReport.duplicate}>
                    Duplicate
                  </MenuItem>
                  <MenuItem value={openProblemReport.content}>
                    Incorrect Content
                  </MenuItem>
                  <MenuItem value={openProblemReport.other}> Other</MenuItem>
                </SelectSubject>
              </FormControl>
              <FormManagedTextField
                name="detail"
                multiline
                rows={3}
                label="Additional information"
              />
              <Stack direction="row" justifyContent="center" spacing={2}>
                <Button variant="outlined" onClick={() => setOpen(false)}>
                  Close
                </Button>
                <Button variant="contained" type="submit">
                  {" "}
                  Submit
                </Button>
              </Stack>
            </Stack>
          </DialogContent>
        </ReportFormManager>
      </Card>
    </Dialog>
  );
}
