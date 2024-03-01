import {
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
  TextField,
} from "@mui/material";
import { Form, Formik } from "formik";
import React from "react";

const initialValues = {
  reason: "",
  description: "",
};

export default function ReportForm({ setOpen, open }) {
  return (
    <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
      <Card>
        <Formik initialValues={initialValues}>
          <Form>
            <DialogTitle> Report a problem </DialogTitle>

            <DialogContent>
              <Stack spacing={2} direction="column">
                <DialogContentText>
                  Select a reason and add additional information if necessary
                </DialogContentText>
                <FormControl variant="filled">
                  <InputLabel> Reason</InputLabel>
                  <Select>
                    <MenuItem value="duplicate"> Duplicate </MenuItem>
                    <MenuItem value="content"> Incorrect Content </MenuItem>
                    <MenuItem value="other"> Other</MenuItem>
                  </Select>
                </FormControl>
                <TextField
                  multiline
                  minRows={3}
                  variant="filled"
                  label="Additional information"
                />
                <Stack direction="row" justifyContent="center" spacing={2}>
                  <Button variant="outlined" onClick={() => setOpen(false)}>
                    Close
                  </Button>
                  <Button variant="contained"> Submit</Button>
                </Stack>
              </Stack>
            </DialogContent>
          </Form>
        </Formik>
      </Card>
    </Dialog>
  );
}
