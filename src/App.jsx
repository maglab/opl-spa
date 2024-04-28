import { CssBaseline, ThemeProvider } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { RouterProvider } from "react-router-dom";
import router from "./routes/router";
import theme from "./theme/theme";

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <CssBaseline />
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <RouterProvider router={router} />
        </ThemeProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
