import { CircularProgress } from "@mui/material";
import { useSnackbar } from "notistack";
import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";


export default function AuthenticatedRoute({
  component: Component,
  roles,
  ...rest
}) {
  const { isAuthenticated, isLoading, user } = useSelector((state) => state.auth);
  const { role: userRole } = user

  const { enqueueSnackbar } = useSnackbar();

  //user not cheked yet
  if (isLoading) {
    return <CircularProgress size={24} />;
  }
  return (
    <Route
      {...rest}
      render={(props) => {
        //user not logged, redirect to login
        if (!isAuthenticated) {
          return (
            <Redirect
              to={{
                pathname: "/login",
                state: {
                  from: props.location,
                },
              }}
            />
          );
        }
        //if roles passed to route and user has none of them, redirect to dashboard
        if (roles && roles.indexOf(userRole) === -1) {
          enqueueSnackbar("No tienes permisos para acceder esta vista", {
            variant: "error",
          });
          return (
            <Redirect
              to={{
                pathname: "/consumptions",
                state: {
                  from: props.location,
                },
              }}
            />
          );
        }
        //user logged and correct role, go to component
        return <Component {...props} />;
      }}
    />
  );
}
