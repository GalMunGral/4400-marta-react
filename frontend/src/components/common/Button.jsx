import React from "react";
import FormField from "./FormField";

const Button = ({
  children: text,
  onClick,
  disabled,
  submit,
  reset,
  isLink,
  isDanger,
  isLight,
  isSmall,
}) => {
  let classes = ["button"];
  if (isLink) classes.push("is-link");
  if (isDanger) classes.push("is-danger");
  if (isLight) classes.push("is-light");
  if (isSmall) classes.push("is-small");

  return (
    <FormField>
      <button
        type={submit ? "submit" : reset ? "reset" : "button"}
        className={classes.join(" ")}
        onClick={onClick}
        disabled={disabled}
      >
        {text}
      </button>
    </FormField>
  );
};

export default Button;
