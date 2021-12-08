import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

export default function UnauthenticatedRoute({
  component: Component,
  ...rest
}) {
  
  const { isAuthenticated, isLoading } = useSelector((state) => state.auth);
  
  if (isLoading) {
    return <div>Loading...</div>;
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
