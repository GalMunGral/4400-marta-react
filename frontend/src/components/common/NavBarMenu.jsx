import React, { useContext } from "react";
import { Link, useNavigate } from "@reach/router";
import { UserContext } from "../../contexts";

const NavBarMenu = () => {
  const [user] = useContext(UserContext);

  if (!user) return null;

  switch (user.userType) {
    case "PASSENGER":
      return (
        <div className="navbar-menu">
          <div className="navbar-start">
            <Link className="navbar-item" to="/my-trip">
              Start a New Trip
            </Link>
            <Link className="navbar-item" to="/trip-history">
              View Trip History
            </Link>
            <Link className="navbar-item" to="/my-cards">
              Manage Cards
            </Link>
          </div>
        </div>
      );
    case "ADMIN":
      return (
        <div className="navbar-menu">
          <div className="navbar-start">
            <Link className="navbar-item" to="/my-trip">
              Start a New Trip
            </Link>
            <Link className="navbar-item" to="/trip-history">
              View Trip History
            </Link>
            <Link className="navbar-item" to="/my-cards">
              Manage Cards
            </Link>
          </div>
        </div>
      );
  }
};

export default NavBarMenu;
