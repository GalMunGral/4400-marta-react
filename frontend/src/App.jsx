import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";

import { UserContext } from "./contexts";

import NavBar from "./components/NavBar";
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

const App = () => {
  const [user, setUser] = useState(null);
  return (
    <Router>
      <UserContext.Provider value={[user, setUser]}>
        <NavBar />
        <div>
          <main>
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
          </main>
        </div>
      </UserContext.Provider>
    </Router>
  );
};

export default App;
