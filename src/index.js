import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { Amplify } from "aws-amplify";
import config from "./aws-exports";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { SnackbarProvider } from "notistack";
import { Provider } from "react-redux";
import store from "./common/store/store";

Amplify.configure(config);

const marinaTheme = createTheme({
  palette: {
    primary: {
      main: "#cc3a2d",
    },
  },
});

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={marinaTheme}>
      <SnackbarProvider maxSnack={3} hideIconVariant>
        <Router>
          <App />
        </Router>
      </SnackbarProvider>
    </ThemeProvider>
  </Provider>,
  document.getElementById("root")
);
