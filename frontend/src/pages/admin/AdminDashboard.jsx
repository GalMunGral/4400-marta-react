import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../contexts";
import { Redirect, useHistory } from "react-router-dom";

const AdminDashboard = () => {
  const [user] = useContext(UserContext);

  const routes = [
    { name: "Station Management", path: "/stations" },
    { name: "Suspended Cards", path: "/suspended-cards" },
    { name: "Breeze Card Management", path: "/breeze-cards" },
    { name: "Passenger Flow Report", path: "/passenger-flow" },
  ];

  if (!user) return <Redirect to="/login" />;

  return (
    <div className="columns is-centered">
      <div className="colums is-one-third">
        <nav className="panel">
          <div className="panel-heading is-marginless has-text-centered title is-1">
            Administrator
          </div>
          {routes.map((route) => (
            <Link
              to={route.path}
              className="panel-block is-active"
              key={route.path}
            >
              <span className="panel-icon">
                <i className="fas fa-book" aria-hidden="true"></i>
              </span>
              {route.name}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default AdminDashboard;
