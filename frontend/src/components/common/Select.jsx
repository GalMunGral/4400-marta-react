import React from "react";

export const Label = ({ children }) => (
  <label className="label">{children}</label>
);

export const Option = ({ forEach: options, keyFn, children: reprFn }) =>
  options.map((o) => (
    <option key={keyFn(o)} value={keyFn(o)}>
      {reprFn(o)}
    </option>
  ));

export const Select = ({ value, onChange, children, disabled, required }) => {
  const childMap = new Map(children.map((child) => [child.type, child]));
  const labelEl = childMap.get(Label);
  const optionEl = childMap.get(Option);
  const { forEach: options, keyFn } = optionEl.props;
  const optionMap = new Map(options.map((o) => [keyFn(o), o]));

  return (
    <div className="field">
      {labelEl}
      <div className="select">
        <select
          value={value ? keyFn(value) : ""}
          disabled={disabled}
          required={required}
          onChange={(e) => {
            const selectedKey = e.target.value;
            const selected = optionMap.get(selectedKey);
            onChange(selected);
          }}
        >
          <option>Please select</option>
          {optionEl}
        </select>
      </div>
    </div>
  );
};

export default Select;
