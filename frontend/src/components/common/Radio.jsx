import React from "react";
import FormField from "./FormField";

export const Radio = ({ label, children, disabled }) => (
  <FormField label={label}>
    {React.Children.map(children, (el) =>
      React.cloneElement(el, {
        name: `radio-${label.toLowerCase()}`,
        disabled,
      })
    )}
  </FormField>
);

export const Option = ({
  checked,
  name,
  disabled,
  onChange,
  children: label,
}) => (
  <label className="radio">
    <input
      type="radio"
      name={name}
      disabled={disabled}
      checked={checked}
      onChange={onChange}
    />
    &nbsp;{label}
  </label>
);

export default Radio;
