import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Link, useHistory, matchPath } from "react-router-dom";
import { useLocation } from "react-router";
import { Role } from "../../../common/roles/role";
import withRole from "../../../common/roles/withRole";
import { LogoutOutlined } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../common/features/auth/authSlice";

const drawerWidth = 240;

export default function ResponsiveDrawer(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  const { isAuthenticated, userRole } = useSelector((state) => state.auth);

  async function handleLogout() {
    await dispatch(logout());
    history.push("/login");
  }

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  let CustomListItem = ({ to, text }) => {
    const match = matchPath(location.pathname, {
      path: to,
    });
    return (
      <ListItem button component={Link} to={to} selected={match != null}>
        <ListItemText primary={text} />
      </ListItem>
    );
  };

  const RestrictedMarinaButton = withRole([Role.Marina])(CustomListItem);

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List onClick={handleDrawerToggle}>
        <CustomListItem to="/consumptions" text="Consumos" />
        <RestrictedMarinaButton to="/users" text="Usuarios" />
        <RestrictedMarinaButton to="/points-of-sale" text="Puntos de venta" />

        <Box m={2}>
          {userRole}
          <IconButton onClick={handleLogout} aria-label="logout">
            <LogoutOutlined />
          </IconButton>
        </Box>
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          {isAuthenticated && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Typography variant="h6" noWrap component="div">
            <Link to="/consumptions">Marina Demo</Link>
          </Typography>
        </Toolbar>
      </AppBar>
      {isAuthenticated && (
        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
          aria-label="mailbox folders"
        >
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: "block", sm: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
          >
            {drawer}
          </Drawer>
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: "none", sm: "block" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
            open
          >
            {drawer}
          </Drawer>
        </Box>
      )}
    </>
  );
}
