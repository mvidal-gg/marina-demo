import React from "react";
import { Route, Switch } from "react-router-dom";
import Dashboard from "../../components/dashboard";
import Login from "../../components/auth/login";
import NotFound from "../../components/notFound/NotFound";
import AuthenticatedRoute from "./AuthenticatedRoute";
import UnauthenticatedRoute from "./UnauthenticatedRoute";
import ForgotPassword from "../../components/auth/forgotPassword";

export default function Routes() {
  return (
    <Switch>
      <UnauthenticatedRoute exact path="/login" component={Login}/>
      <UnauthenticatedRoute exact path="/forgot-password" component={ForgotPassword}/>
      <AuthenticatedRoute exact path="/" component={Dashboard}/>
      <Route component={NotFound} />
    </Switch>
  );
}
