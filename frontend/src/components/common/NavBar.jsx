import React from "react";
import NavBarBrand from "./NavBarBrand";
import NavBarMenu from "./NavBarMenu";
import NavBarButton from "./NavBarButton";

const NavBar = () => {
  return (
    <nav
      className="navbar is-fixed-top is-light"
      role="navigation"
      aria-label="main navigation"
    >
      <NavBarBrand />
      <NavBarMenu />
      <NavBarButton />
    </nav>
  );
};

export default NavBar;
