import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { UserProvider } from "./common/providers/userProvider";
import { BrowserRouter as Router } from "react-router-dom";
import { Amplify } from "aws-amplify";
import config from "./aws-exports";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { SnackbarProvider } from "notistack";

Amplify.configure(config);

const marinaTheme = createTheme({
  palette: {
    primary: {
      main: "#cc3a2d",
    },
  },
});

ReactDOM.render(
  <UserProvider>
    <ThemeProvider theme={marinaTheme}>
      <SnackbarProvider maxSnack={3} hideIconVariant>
        <Router>
          <App />
        </Router>
      </SnackbarProvider>
    </ThemeProvider>
  </UserProvider>,
  document.getElementById("root")
);
