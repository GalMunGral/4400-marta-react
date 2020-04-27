import React, { useState } from "react";
import { Router, Redirect } from "@reach/router";
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
import { UserContext, NotificationContext } from "./contexts";
import Notification from "./components/common/Notification";

const NotFound = () => <Redirect to="/login" noThrow />;

const App = () => {
  const username = localStorage.getItem("username");
  const userType = localStorage.getItem("userType");

  const [notifications, setNotifications] = useState([]);
  const [user, setUser] = useState(
    username && userType ? { username, userType } : null
  );

  return (
    <NotificationContext.Provider value={[notifications, setNotifications]}>
      <UserContext.Provider value={[user, setUser]}>
        <Router>
          <NotFound default />
          <Login path="/login" />
          <Registration path="/registration" />
          <AdminDashboard path="/admin-dashboard" />
          <Stations path="/stations" />
          <SuspendedCards path="/suspended-cards" />
          <BreezeCards path="/breeze-cards" />
          <FlowReport path="/passenger-flow" />
          <Trip path="/my-trip" />
          <ManageCards path="/my-cards" />
          <TripHistory path="/trip-history" />
        </Router>
      </UserContext.Provider>

      <Notification {...{ notifications, setNotifications }} />
    </NotificationContext.Provider>
  );
};

export default App;
