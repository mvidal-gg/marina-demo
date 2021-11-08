import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useUser } from "../hooks/useUser";

export default function AuthenticatedRoute({ component: Component, ...rest }) {
  const { isAuthenticated, isLoading } = useUser();

  return (
    <Route
      {...rest}
      render={(props) => {
        if (isLoading) {
          return <div>Loading...</div>;
        } else {
          if (isAuthenticated) {
            return <Component {...props} />;
          } else {
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
        }
      }}
    />
  );
}
