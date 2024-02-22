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
} from "@mui/material";
import { Formik, Form, useFormik, useField } from "formik";

const initialValues = {
  reason: "", // Change 'type' to 'reason' to match your form fields
  information: "",
};

const validation = (values, props) => {
  const errors = {};

  if (!values.reason) {
    errors.reason = "Please select reason";
  }
  if (values.reason === "other" && !values.information.trim()) {
    errors.information =
      "Please enter additional information if choosing other.";
  }
};

function Submit() {}

function FeedbackForm({ open, onClose }) {
  return (
    <Dialog onClose={onClose} open={open} maxWidth="sm">
      <Paper>
        <Formik initialValues={initialValues} validate={validation}>
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
                    <MenuItem value="Duplicate"> Duplicate </MenuItem>
                    <MenuItem value="content"> Incorrect content </MenuItem>
                    <MenuItem value="other">Other</MenuItem>
                  </Select>
                  <FormHelperText>
                    {formik.touched.reason && formik.errors.reason}
                  </FormHelperText>
                </FormControl>
                <TextField
                  multiline
                  minRows={3}
                  variant="filled"
                  label="Additional information"
                  name="information"
                  {...formik.getFieldProps("information")}
                  error={
                    formik.touched.information && formik.errors.information
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
