import React from "react";
import FormField from "./FormField";

const Input = ({
  children: label,
  type,
  value,
  onChange,
  disabled,
  required,
}) => (
  <FormField label={label}>
    <input
      className="input"
      type={type || "text"}
      value={value || ""}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
      required={required}
    />
  </FormField>
);

export default Input;
