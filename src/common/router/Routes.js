import React from "react";
import { Route, Switch } from "react-router-dom";
import Dashboard from "../../components/dashboard";
import Login from "../../components/login";
import NotFound from "../../components/notFound/NotFound";
import AuthenticatedRoute from "./AuthenticatedRoute";
import UnauthenticatedRoute from "./UnauthenticatedRoute";

export default function Routes() {
  return (
    <Switch>
      <UnauthenticatedRoute exact path="/login">
        <Login />
      </UnauthenticatedRoute>
      <AuthenticatedRoute exact path="/">
        <Dashboard />
      </AuthenticatedRoute>
      <Route component={NotFound} />
    </Switch>
  );
}
