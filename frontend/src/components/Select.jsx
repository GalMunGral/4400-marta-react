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
  <div>
    <label htmlFor={`select-${label}`}>{label}</label>
    <select
      id={`select-${label}`}
      value={value}
      disabled={disabled}
      onChange={onChange}
    >
      <option>nothing</option>
      {options.map((option) => (
        <option key={keyFn(option)} value={keyFn(option)}>
          {toString(option)}
        </option>
      ))}
    </select>
  </div>
);

export default Select;
