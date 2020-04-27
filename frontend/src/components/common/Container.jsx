import React, { useState, useEffect } from "react";
import NavBar from "./NavBar";

const Container = ({ children, wide, medium }) => {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    setVisible(true);
    return () => {
      setVisible(false);
    };
  }, []);

  return (
    <>
      <NavBar />
      <main
        id="main"
        className={`columns is-centered ${visible ? "" : "transparent"}`}
      >
        <div
          className={`column  ${
            wide ? "is-two-thirds" : medium ? "is-half" : "is-one-third"
          }`}
        >
          {children}
        </div>
      </main>
    </>
  );
};

export default Container;
