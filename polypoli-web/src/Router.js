import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Head from "./components/Head";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import FindAccount from "./components/FindAccount";
import UserSetting from "./components/UserSetting";

export default () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Login} />
      <Route path="/Login" component={Login} />
      <Route path="/SignUp" component={SignUp} />
      <Route path="/FindAccount" component={FindAccount} />
      <Route path="/UserSetting" component={UserSetting} />
      <Route path="/*" component={Head} />
    </Switch>
    <div style={{ paddingBottom: "60px" }} />
  </BrowserRouter>
);
