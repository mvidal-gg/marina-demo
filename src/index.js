import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { UserProvider } from "./common/providers/userProvider";
import { BrowserRouter as Router } from "react-router-dom";
import { Amplify } from "aws-amplify";
import config from "./aws-exports";
import { ThemeProvider, createTheme } from "@mui/material/styles";

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
      <Router>
          <App />
      </Router>
    </ThemeProvider>
  </UserProvider>,
  document.getElementById("root")
);
