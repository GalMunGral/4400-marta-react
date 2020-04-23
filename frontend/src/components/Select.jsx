import React from "react";

const Select = ({
  label,
  disabled,
  value,
  onChange,
  options,
  toString,
  keyFn,
}) => (
  <div className="field">
    <label className="label">{label}</label>
    <div className="select">
      <select value={value} disabled={disabled} onChange={onChange}>
        <option>Please select</option>
        {options.map((option) => (
          <option key={keyFn(option)} value={keyFn(option)}>
            {toString(option)}
          </option>
        ))}
      </select>
    </div>
  </div>
);

export default Select;
