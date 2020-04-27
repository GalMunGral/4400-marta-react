import React from "react";

const Card = ({ children, sticky }) => (
  <div className={`box ${sticky ? "sticky" : ""}`}>{children}</div>
);

export default Card;
