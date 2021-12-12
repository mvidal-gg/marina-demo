import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import { CircularProgress } from "@mui/material";

export default function UnauthenticatedRoute({
  component: Component,
  ...rest
}) {
  
  const { isAuthenticated, isLoading } = useSelector((state) => state.auth);
  
  if (isLoading) {
    return <CircularProgress size={24} />;
  }
  
  return (
    <Route
      {...rest}
      render={(props) => {
        if (!isAuthenticated) {
          return (
            <>
              <Component {...props} />
            </>
          );
        } else {
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
      }}
    />
  );
}
