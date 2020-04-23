import React from "react";
import { Router, Link } from "react-router-dom";
import { createBrowserHistory } from "history";
import Main from "./Main";
import logo from "../../assets/logo.svg";

const AppContainer = () => {
  const history = createBrowserHistory({});

  return (
    <Router history={history}>
      <div>
        <nav>
          <Link to="/">
            <img src={logo} style={{ height: "25px" }} />
          </Link>
        </nav>
        <Main />
      </div>
    </Router>
  );
};

export default AppContainer;
