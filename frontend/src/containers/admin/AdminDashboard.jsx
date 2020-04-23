import React, { Component, useContext } from "react";
import { UserContext } from "../../contexts";
import { Redirect, useHistory } from "react-router-dom";

const AdminDashboard = () => {
  const [user, setUser] = useContext(UserContext);
  const history = useHistory();

  const routes = [
    {
      name: "Station Management",
      path: "/stations",
    },
    {
      name: "Suspended Cards",
      path: "/suspended-cards",
    },
    {
      name: "Breeze Card Management",
      path: "/breeze-cards",
    },
    {
      name: "Passenger Flow Report",
      path: "/passenger-flow",
    },
  ];

  if (!user) return <Redirect to="/login" />;

  return (
    <React.Fragment>
      <div>Administrator</div>
      <div>
        {routes.map((route) => (
          <button key={route.path} onClick={() => history.push(route.path)}>
            {route.name}
          </button>
        ))}
        <button onClick={() => setUser(null)}>Logout</button>
      </div>
    </React.Fragment>
  );
};

export default AdminDashboard;
