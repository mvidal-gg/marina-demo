import { useSnackbar } from "notistack";
import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useUser } from "../hooks/useUser";

export default function AuthenticatedRoute({
  component: Component,
  roles,
  ...rest
}) {
  const { isAuthenticated, userRole, isLoading } = useUser();
  const { enqueueSnackbar } = useSnackbar();

  //user not cheked yet
  if (isLoading) {
    return <div>Loading...</div>;
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
                pathname: "/",
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
