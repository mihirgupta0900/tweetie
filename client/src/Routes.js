import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Base from "./pages/Base";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Feed from "./pages/Feed";

const Routes = () => {
    return (
        <Router>
          <Switch>
            <Route exact path='/'>
              <Base />
            </Route>
            <Route path='/signin'>
              <Signin />
            </Route>
            <Route path='/signup'>
              <Signup />
            </Route>
            <Route path='/feed'>
              <Feed />
            </Route>
          </Switch>
        </Router>
    );
}

export default Routes;
