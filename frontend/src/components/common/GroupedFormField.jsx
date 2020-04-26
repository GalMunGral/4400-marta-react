import React from "react";

export const GroupedFormField = ({ children }) => (
  <div className="field is-grouped">{children}</div>
);

export const GroupedInput = ({
  children: label,
  type,
  value,
  onChange,
  disabled,
}) => (
  <>
    <label className="label">{label}&nbsp;</label>
    <div className="control">
      <input
        className="input is-small"
        type={type || "text"}
        value={value || ""}
        onChange={onChange}
        disabled={disabled}
      />
    </div>
  </>
);

export const GroupedButton = ({
  children: text,
  onClick,
  disabled,
  reset,
  submit,
  isLink,
  isDanger,
  isLight,
  isSmall,
  isLarge,
}) => {
  let classes = ["button"];
  if (isLink) classes.push("is-link");
  if (isDanger) classes.push("is-danger");
  if (isLight) classes.push("is-light");
  if (isSmall) classes.push("is-small");
  if (isLarge) classes.push("is-large");

  return (
    <div className="control">
      <button
        type={submit ? "submit" : reset ? "reset" : "button"}
        className={classes.join(" ")}
        onClick={onClick}
        disabled={disabled}
      >
        {text}
      </button>
    </div>
  );
};

export default GroupedFormField;
