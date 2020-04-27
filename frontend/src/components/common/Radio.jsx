import React from "react";
import FormField from "./FormField";

export const Radio = ({ label, children, disabled, required }) => (
  <FormField label={label}>
    {React.Children.map(children, (el) =>
      React.cloneElement(el, {
        name: `radio-${label.toLowerCase()}`,
        disabled,
        required,
      })
    )}
  </FormField>
);

export const Option = ({
  checked,
  name,
  disabled,
  required,
  onChange,
  children: label,
}) => (
  <label className="radio">
    <input
      type="radio"
      {...{
        name,
        disabled,
        required,
        checked,
        onChange,
      }}
    />
    &nbsp;{label}
  </label>
);

export default Radio;
