import { Box } from "@mui/system";
import React, { useState } from "react";
import "./App.css";
import Routes from "./common/router/Routes";
import Main from "./components/common/main";
import Nav from "./components/nav";

function App() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen)
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <Nav handleDrawerToggle={handleDrawerToggle} open={drawerOpen}></Nav>
      <Main>
        <Routes />
      </Main>
    </Box>
  );
}

export default App;
