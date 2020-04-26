import React from "react";
import FormField from "./FormField";

const Input = ({ children: label, type, value, onChange, disabled }) => (
  <FormField label={label}>
    <input
      className="input"
      type={type || "text"}
      value={value || ""}
      onChange={onChange}
      disabled={disabled}
    />
  </FormField>
);

export default Input;
