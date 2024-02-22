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
} from "@mui/material";
import { Formik, Form, useField } from "formik";

const initialValues = {
  reason: "", // Change 'type' to 'reason' to match your form fields
  information: "",
};

function FeedbackForm({ open, onClose }) {
  const [reasonField, reasonMeta] = useField("reason");
  const [informationField, informationMeta] = useField("information");
  return (
    <Dialog onClose={onClose} open={open} maxWidth="sm">
      <Paper>
        <Formik initialValues={initialValues}>
          <Form>
            <Stack spacing={2.5} padding={2}>
              <Typography variant="h5"> Report </Typography>
              <Typography variant="body1">
                Select a reason for the report and add additional information if
                necessary.
              </Typography>
              <FormControl variant="filled">
                <InputLabel id="reason"> Reason </InputLabel>
                <Select labelId="reason" {...reasonField}>
                  <MenuItem value="Duplicate"> Duplicate </MenuItem>
                  <MenuItem value="content"> Incorrect content </MenuItem>
                  <MenuItem value="other">Other</MenuItem>
                </Select>
              </FormControl>
              <TextField
                multiline
                minRows={3}
                variant="filled"
                label="Additional information"
                name="information"
                {...informationField}
              />
              <Stack
                direction="row"
                display="flex"
                justifyContent="center"
                spacing={2}
              >
                <Button variant="outlined" color="primary" onClick={onClose}>
                  {" "}
                  Exit{" "}
                </Button>
                <Button variant="contained" type="submit">
                  Submit
                </Button>
              </Stack>
            </Stack>
          </Form>
        </Formik>
      </Paper>
    </Dialog>
  );
}

export default FeedbackForm;
