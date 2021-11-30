import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useUser } from "../hooks/useUser";

export default function UnauthenticatedRoute({
  component: Component,
  ...rest
}) {
  
  const { isAuthenticated, isLoading } = useUser();
  
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
                pathname: "/",
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
