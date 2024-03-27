import MicrosoftIcon from "@mui/icons-material/Microsoft";
import { Button, Divider, Link, Paper, Typography } from "@mui/material";
import { Form, Formik } from "formik";
import React from "react";
import useExtendedTheme from "../theme/useExtendedTheme";
import Center from "./common/center";
import FormManagedTextField from "./common/formManagedTextField";
import StandardStack from "./common/standardStack";

export default function Login() {
  const theme = useExtendedTheme();
  const initialValues = {
    email: "",
    password: "",
  };

  const onSubmitHandler = () => {};

  return (
    <Center>
      <Paper>
        <StandardStack main p minWidth={theme.breakpoints.values.xs}>
          <StandardStack minor>
            <Button
              startIcon={<MicrosoftIcon />}
              variant="outlined"
              size="large"
            >
              Login with Microsoft
            </Button>
          </StandardStack>
          <Divider />
          <Formik initialValues={initialValues} onSubmit={onSubmitHandler}>
            <Form>
              <StandardStack minor>
                <FormManagedTextField size="small" name="email" label="Email" />
                <FormManagedTextField
                  size="small"
                  type="password"
                  name="password"
                  label="Password"
                />
                <Button type="submit" variant="contained">
                  Login
                </Button>
                <Typography variant="caption">
                  Don&apos;t have an account?
                  <Typography variant="caption" color="primary">
                    <Link href="/"> Register here</Link>
                  </Typography>
                </Typography>
              </StandardStack>
            </Form>
          </Formik>
        </StandardStack>
      </Paper>
    </Center>
  );
}
