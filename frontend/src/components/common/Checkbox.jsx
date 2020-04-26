import React from "react";

const Checkbox = ({ checked, disabled, onChange, children: label }) => (
  <div className="field">
    <div className="control">
      <label className="checkbox">
        <input
          type="checkbox"
          checked={checked}
          disabled={disabled}
          onChange={onChange}
        />
        &nbsp;{label}
      </label>
    </div>
  </div>
);

export default Checkbox;
