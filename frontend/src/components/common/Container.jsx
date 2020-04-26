import React from "react";
import NavBar from "./NavBar";

const Container = ({ children, isWide }) => (
  <>
    <NavBar />
    <main id="main" className="columns is-centered">
      <div className={`column  ${isWide ? "is-half" : "is-one-third"}`}>
        {children}
      </div>
    </main>
  </>
);

export default Container;
