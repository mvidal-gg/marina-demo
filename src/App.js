import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import "./App.css";
import Routes from "./common/router/Routes";
import Main from "./components/common/main";
import Nav from "./components/common/nav";
import { clearUser, setUser } from "./common/features/auth/authSlice";
import { useDispatch } from "react-redux";
import Auth from "@aws-amplify/auth";

function App() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then((user) => {
        let serializedUser = JSON.stringify(user)
        dispatch(setUser(serializedUser));
      })
      .catch((err) => dispatch(clearUser()));
  }, [dispatch]);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Nav handleDrawerToggle={handleDrawerToggle} open={drawerOpen}></Nav>
      <Main>
        <Routes />
      </Main>
    </Box>
  );
}

export default App;
