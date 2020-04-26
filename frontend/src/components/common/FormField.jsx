import React from "react";

const FromField = ({ label, children: control }) => (
  <div className="field">
    {label ? <label className="label">{label}</label> : null}
    <div className="control">{control}</div>
  </div>
);

export default FromField;
