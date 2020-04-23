import React, { useState } from "react";
import { Route, Redirect } from "react-router-dom";
import BreezeCards from "./admin/BreezeCards";
import FlowReport from "./admin/FlowReport";
import Trip from "./passenger/Trip";
import ManageCards from "./passenger/ManageCards";
import TripHistory from "./passenger/TripHistory";
import Stations from "./admin/Stations";
import SuspendedCards from "./admin/SuspendedCards";
import AdminDashboard from "./admin/AdminDashboard";
import Login from "./auth/Login";
import Registration from "./auth/Registration";
import { UserContext } from "../contexts";

const Main = () => {
  const userHook = useState(null);

  return (
    <UserContext.Provider value={userHook}>
      <main style={{ marginTop: "60px" }}>
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
      </main>
    </UserContext.Provider>
  );
};

export default Main;
