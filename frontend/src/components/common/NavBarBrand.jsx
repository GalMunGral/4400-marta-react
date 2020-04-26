import React from "react";
import { Link } from "@reach/router";
import logo from "../../..//assets/logo.svg";

const NavBarBrand = () => (
  <div className="navbar-brand">
    <Link to="/" className="navbar-item">
      <img src={logo} style={{ height: "25px" }} />
    </Link>
  </div>
);

export default NavBarBrand;
