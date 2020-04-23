import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Link,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";

import { UserContext } from "./contexts";

import BreezeCards from "./pages/admin/BreezeCards";
import FlowReport from "./pages/admin/FlowReport";
import Trip from "./pages/passenger/Trip";
import ManageCards from "./pages/passenger/ManageCards";
import TripHistory from "./pages/passenger/TripHistory";
import Stations from "./pages/admin/Stations";
import SuspendedCards from "./pages/admin/SuspendedCards";
import AdminDashboard from "./pages/admin/AdminDashboard";
import Login from "./pages/auth/Login";
import Registration from "./pages/auth/Registration";

import logo from "../assets/logo.svg";

const App = () => {
  const userHook = useState(null);
  return (
    <Router>
      <div>
        <nav>
          <Link to="/">
            <img src={logo} style={{ height: "25px" }} />
          </Link>
        </nav>
        <UserContext.Provider value={userHook}>
          <Switch>
            <Route exact path="/" render={() => <Redirect to="/login" />} />
            <Route path="/login" component={Login} />
            <Route path="/registration" component={Registration} />
            <Route path="/admin-dashboard" component={AdminDashboard} />
            <Route exact path="/stations" component={Stations} />
            <Route path="/suspended-cards" component={SuspendedCards} />
            <Route path="/breeze-cards" component={BreezeCards} />
            <Route path="/passenger-flow" component={FlowReport} />
            <Route path="/my-trip" component={Trip} />
            <Route path="/my-cards" component={ManageCards} />
            <Route path="/trip-history" component={TripHistory} />
          </Switch>
        </UserContext.Provider>
      </div>
    </Router>
  );
};

export default App;
