import React from "react";
import { Route, Switch } from "react-router-dom";
import Dashboard from "../../components/dashboard";
import Login from "../../components/auth/login";
import NotFound from "../../components/notFound/NotFound";
import AuthenticatedRoute from "./AuthenticatedRoute";
import UnauthenticatedRoute from "./UnauthenticatedRoute";
import ForgotPassword from "../../components/auth/forgotPassword";
import ActivateAccount from "../../components/auth/activateAccount";
import Users from "../../components/users";
import Consumptions from "../../components/consumptions";
import SalePoints from "../../components/salePoints";
import NewUser from "../../components/users/newUser";
import NewConsumption from "../../components/consumptions/newConsumption";
import NewSalePoint from "../../components/salePoints/newSalePoint";
import { Role } from "../roles/role";

export default function Routes() {
  return (
    <Switch>
      <UnauthenticatedRoute exact path="/login" component={Login}/>
      <UnauthenticatedRoute exact path="/forgot-password" component={ForgotPassword}/>
      <UnauthenticatedRoute exact path="/activate-account" component={ActivateAccount}/>
      <AuthenticatedRoute exact path="/" component={Dashboard} />
      <AuthenticatedRoute exact path="/consumptions" component={Consumptions}/>
      <AuthenticatedRoute exact path="/consumptions/new" component={NewConsumption}/>
      <AuthenticatedRoute exact path="/users" component={Users}/>
      <AuthenticatedRoute exact path="/users/new" component={NewUser} roles={[Role.Marina]}/>
      <AuthenticatedRoute exact path="/points-of-sale" component={SalePoints}/>
      <AuthenticatedRoute exact path="/points-of-sale/new" component={NewSalePoint} roles={[Role.Marina]}/>
      <Route component={NotFound} />
    </Switch>
  );
}
