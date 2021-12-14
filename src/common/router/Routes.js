import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Login from "../../views/auth/login";
import NotFound from "../../views/notFound/NotFound";
import AuthenticatedRoute from "./AuthenticatedRoute";
import UnauthenticatedRoute from "./UnauthenticatedRoute";
import ForgotPassword from "../../views/auth/forgotPassword";
import ActivateAccount from "../../views/auth/activateAccount";
import Users from "../../views/users";
import Consumptions from "../../views/consumptions";
import SalePoints from "../../views/salePoints";
import NewUser from "../../views/users/newUser";
import NewConsumption from "../../views/consumptions/newConsumption";
import NewSalePoint from "../../views/salePoints/newSalePoint";
import { Role } from "../roles/role";

export default function Routes() {

  return (
    <Switch>
      <UnauthenticatedRoute exact path="/login" component={Login} />
      <UnauthenticatedRoute
        exact
        path="/forgot-password"
        component={ForgotPassword}
      />
      <UnauthenticatedRoute
        exact
        path="/activate-account"
        component={ActivateAccount}
      />
      <AuthenticatedRoute
        exact
        path="/consumptions"
        component={Consumptions}
      />
      <AuthenticatedRoute
        exact
        path="/consumptions/new"
        component={NewConsumption}
      />
      <AuthenticatedRoute exact path="/users" component={Users} />
      <AuthenticatedRoute
        exact
        path="/users/new"
        component={NewUser}
        roles={[Role.Marina]}
      />
      <AuthenticatedRoute exact path="/points-of-sale" component={SalePoints} />
      <AuthenticatedRoute
        exact
        path="/points-of-sale/new"
        component={NewSalePoint}
        roles={[Role.Marina]}
      />
      <Route exact path="/">
        <Redirect to="/consumptions" />
      </Route>
      <Route component={NotFound} />
    </Switch>
  );
}
