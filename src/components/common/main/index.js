import * as React from "react";
import { Box } from "@mui/system";
import { Toolbar } from "@mui/material";

const drawerWidth = 240;

export default function Main({ children }) {

  return (
    <Box
      component="main"
      sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
    >
      <Toolbar />
      {children}
    </Box>
  );
}
