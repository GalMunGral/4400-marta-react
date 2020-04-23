import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import logo from "../../assets/logo.svg";
import { UserContext } from "../contexts";

const NavBar = () => {
  const [user, setUser] = useContext(UserContext);
  const history = useHistory();
  return (
    <nav
      className="navbar is-fixed-top is-light"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="navbar-brand">
        <Link to="/" className="navbar-item">
          <img src={logo} style={{ height: "25px" }} />
        </Link>
      </div>

      <div className="navbar-menu">
        {user && user.userType === "PASSENGER" ? (
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
        ) : null}

        {user ? (
          <div className="navbar-end">
            <div className="navbar-item">
              <button
                className="button"
                type="button"
                onClick={() => {
                  setUser(null);
                  history.push("/login");
                }}
              >
                Logout
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </nav>
  );
};

export default NavBar;
